import React from "react";
import {connect} from 'react-redux';
import {INCREASE,DECREASE,REMOVE} from '../../constants/action'
import Button from '@material-ui/core/Button';

const CartItem = ({ img, name, price, total,quantity,increase,remove,decrease }) => {
  return (
    <div className="cart-item" >
      {/* <img src={img} alt={name} /> */}
      <div style={{"display": "flex"}}>
        <h2>{name}:</h2>
        <h2 className="item-price">${price} * {quantity}  = {total} </h2>
        {/* remove button */}
        <Button style={{"margin-left":'100px',padding:'1px'}} variant="contained" color="primary" onClick={() => remove() }>
        Remove
      </Button>
        {/* <button style={{marginLeft:40}} onClick={() => remove() }>remove</button> */}
      </div>
      <div>
        {/* increase amount */}
        <Button variant="contained" color="primary" onClick={ () => increase() }>
        Increase
      </Button>

      <Button variant="contained" color="primary" onClick={ () => decrease() }>
        Decrease
      </Button>
      </div>
      <br/>
    </div>
  );
};

const mapDispatchToProps = (dispatch,ownProps) => {
  const { productId,quantity } = ownProps
  // console.log("ownProps",ownProps)
  return { 
    increase: () => dispatch( {type:INCREASE ,payload:{ productId } } ),
    remove: () => dispatch( {type:REMOVE ,payload:{ productId } } ),
    decrease: () => dispatch( {type:DECREASE ,payload:{ productId,quantity} } )
  }
}

export default connect(null,mapDispatchToProps)(CartItem);
