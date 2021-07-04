import React from "react";
import {connect} from 'react-redux';
import {INCREASE,DECREASE,REMOVE} from '../../constants/action'

const CartItem = ({ img, title, price, total,quantity,increase,remove,decrease }) => {
  return (
    <div className="cart-item" >
      {/* <img src={img} alt={title} /> */}
      <div style={{"display": "flex",padding:4}}>
        <h4>{title}:</h4>
        <h4 className="item-price">${price} * {quantity}  = {total} </h4>
        {/* remove button */}
        <button  onClick={() => remove() }>remove</button>
      </div>
      <div>
        {/* increase amount */}
        <button className="amount-btn" onClick={ () => increase() }>
          Increse
        </button>
        <button className="amount-btn" onClick={ () => decrease() }>
          Decrease
        </button>
      </div>

    </div>
  );
};

const mapDispatchToProps = (dispatch,ownProps) => {
  const { id,quantity } = ownProps
  // console.log("ownProps",ownProps)
  return { 
    increase: () => dispatch( {type:INCREASE ,payload:{ id } } ),
    remove: () => dispatch( {type:REMOVE ,payload:{ id } } ),
    decrease: () => dispatch( {type:DECREASE ,payload:{ id,quantity} } )
  }
}

export default connect(null,mapDispatchToProps)(CartItem);