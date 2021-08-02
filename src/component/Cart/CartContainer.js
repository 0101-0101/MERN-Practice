import React from "react";
import CartItem from "./CartItem";
import {connect } from "react-redux"
import { GET_TOTAL } from '../../constants/action'
import { useSelector,useDispatch } from "react-redux";
import Axios from 'axios'
import authHeader from "../../service/auth-header";

import Alert from '@material-ui/lab/Alert';
import { useState , useEffect } from "react"
import axios from 'axios';

import { PayPalButton } from "react-paypal-button-v2";

const CartContainer = ({ dispatch }) => {
  const [showAlert, setShowAlert] = useState(null);

  const cart = useSelector(state => state.cart)
  const total = useSelector(state => state.cartTotal)

  useEffect( ()=> {
    const add_PayPalScript = async () => {

      const {data:clientId} = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      // script.onload  
    }
    add_PayPalScript()
    
  },[])


  function CartAP(){
    console.log("cart",JSON.parse(localStorage.getItem('Cart')));
    var user = JSON.parse(localStorage.getItem('userInfo'))
    if (user){
      try {  
        // var = JSON.parse(localStorage.getItem('Cart'));
        const data  =  Axios.post('http://localhost:9000/cart', JSON.parse(localStorage.getItem('Cart')), { headers: authHeader() })
        
        .then(data => console.log("Done")); 
        
      }catch (error) {
          console.log("Error:",error);
        }
    }
    else{
    // <p>logins</p>
    setShowAlert(true)
    }
  }



  React.useEffect( () => {
    dispatch({type:GET_TOTAL})
  })
  if (cart.length === 0) {
    return (
      <section className="cart">
        {/* cart header */}
        <header>
          <h2>Your Cart</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart" style={{width:"500px",margin: "0 auto"}}>
      {showAlert &&  <Alert severity="success" color="info">
  {/* User must login for checkout — check it out! */}
  Transaction Sucessfull
</Alert>}
      {/* cart header */}
      <header>
        <h2>Your Cart</h2>
      </header>
      {/* cart items */}
      <article >
        {cart.map(item => {
          return <CartItem key={item.id} {...item} />;
        })}
      </article>


      
      
      {/* cart footer */}
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        {/* <button className="amount-btn" onClick={ ()=> CartAP() } >
          Checkout
        </button> */}

        <PayPalButton
        amount={total}
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {

          console.log("Transaction completed by " + details.payer.name.given_name);
          console.log("data", data)
          console.log("details:", details)
          setShowAlert(true)

          // OPTIONAL: Call your server to save the transaction
          // return fetch("/paypal-transaction-complete", {
          //   method: "post",
          //   body: JSON.stringify({
          //     orderID: data.orderID
          //   })
          // });
        }}
      />
        {/* <button className="btn clear-btn" onClick={() => dispatch({type:CLEAR_CART})}>clear cart</button> */}
      </footer>
    </section>
  );
};

function mapStateToProps(store){
  return { cart:store.cart , total:store.cartTotal }
}

export default connect(mapStateToProps)(CartContainer);
