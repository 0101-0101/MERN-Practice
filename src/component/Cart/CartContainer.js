import React from "react";
import CartItem from "./CartItem";
import {connect } from "react-redux"
import { GET_TOTAL } from '../../constants/action'
import { useSelector,useDispatch } from "react-redux";
import Axios from 'axios'
import authHeader from "../../service/auth-header";

const CartContainer = ({ dispatch }) => {

  const cart = useSelector(state => state.cart)
  const total = useSelector(state => state.cartTotal)


  function CartAP(){
    console.log("cart",JSON.parse(localStorage.getItem('Cart')));
    try {  
      // var = JSON.parse(localStorage.getItem('Cart'));
      const data  =  Axios.post('http://localhost:9000/cart', JSON.parse(localStorage.getItem('Cart')), { headers: authHeader() })
      
      .then(data => console.log("Done")); 
      
    }catch (error) {
        console.log("Error:",error);
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
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <article>
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
        <button className="amount-btn" onClick={ ()=> CartAP() } >
          Checkout
        </button>
        {/* <button className="btn clear-btn" onClick={() => dispatch({type:CLEAR_CART})}>clear cart</button> */}
      </footer>
    </section>
  );
};

function mapStateToProps(store){
  return { cart:store.cart , total:store.cartTotal }
}

export default connect(mapStateToProps)(CartContainer);
