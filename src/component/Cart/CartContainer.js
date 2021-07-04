import React from "react";
import CartItem from "./CartItem";
import {connect } from "react-redux"
import { GET_TOTAL } from '../../constants/action'
import { useSelector,useDispatch } from "react-redux";

const CartContainer = ({ dispatch }) => {

  const cart = useSelector(state => state.cart)
  const total = useSelector(state => state.cartTotal)



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
        {/* <button className="btn clear-btn" onClick={() => dispatch({type:CLEAR_CART})}>clear cart</button> */}
      </footer>
    </section>
  );
};

function mapStateToProps(store){
  return { cart:store.cart , total:store.cartTotal }
}

export default connect(mapStateToProps)(CartContainer);
