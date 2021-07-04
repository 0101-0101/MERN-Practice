import {DECREASE,INCREASE,REMOVE,CLEAR_CART,GET_TOTAL,GET_DETAIL,ADDTOCART,
  MODALSWITCHON,MODALSWITCHOFF,FETCH_DATA,USER_SIGNIN_REQUEST,USER_REGISTER,LOGOUT} from '../constants/action'

import Axios from 'axios'


function reducer(state,action) {

    if (action.type === USER_REGISTER){
      console.log(action.payload.username,action.payload.email,action.payload.password);
      const username = action.payload.username
      const email = action.payload.email
      const password = action.payload.password
    try {  
      const data  =  Axios.post('http://localhost:9000/api/auth/signup/', { username , email , password });
        // dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        // console.log(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
    }catch (error) {
        console.log("Error:",error);
      }
    };

    if (action.type === USER_SIGNIN_REQUEST){
      const username = action.payload.username
      const password = action.payload.password
    
    try {  
      const res  =  Axios.post('http://localhost:9000/api/auth/signin/', { username  , password })
      .then( res=>{ localStorage.setItem('userInfo', JSON.stringify(res.data)); })
        // dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        // console.log(res);
        // localStorage.setItem('userInfo', JSON.stringify(val.data));
    }catch (error) {
        console.log("Error:",error);
      }
    }

  
    // console.log("From Reducer",state,action);
    if (action.type === GET_DETAIL ){
        // console.log("Payload",action.payload.product.product);
        // console.log("Reducer",state,action);
        return {...state,detailProduct:action.payload.product.dproduct}
    }
    if (action.type === ADDTOCART ){
        // console.log("fdsg",action.payload.product.pro);
        console.log("action.payload",action.payload);
        const product = action.payload
        const updatedCart = [...state.cart];
        console.log("updatedCart:",updatedCart);
        const updatedItemIndex = updatedCart.findIndex(item => item.id === action.payload.id);
        console.log(updatedItemIndex);
        if(updatedItemIndex < 0) {
            updatedCart.push({id:product.id,title:product.title, quantity: 1,price: product.price, total: product.price });
        }else {
          
        const updatedItem = { ...updatedCart[updatedItemIndex] };
        updatedItem.quantity++;
        updatedItem.total = updatedItem.price * updatedItem.quantity
        console.log( updatedItem.total);
        updatedCart[updatedItemIndex] = updatedItem;
        }

        localStorage.setItem('Cart', JSON.stringify(updatedCart));

        return {...state, cart: updatedCart};

  }

    if (action.type === MODALSWITCHON){

        return {...state, modalOpen:true,modalProduct: action.payload.product.dproduct}
    }

    if (action.type === MODALSWITCHOFF){

        return {...state, modalOpen:false}
    }

    if (action.type === CLEAR_CART){
      const updatedCart=  {...state,cart:[]}
      localStorage.setItem('Cart', JSON.stringify(updatedCart));
      return {...state,cart:[]}
      }

    if (action.type === DECREASE){
        // return { count: state.count - 1 }
        // return {...state,count: state.count - 1 }
        let tempCart = [];
        if (action.payload.quantity ===1 ){
          tempCart = state.cart.filter(
            cartItem => cartItem.id !==action.payload.id
          )
        } 
          
        else{  
        
        tempCart = state.cart.map(cartItem => {
          if(cartItem.id === action.payload.id){
            cartItem.quantity = cartItem.quantity - 1
            cartItem.total = cartItem.quantity * cartItem.price
            cartItem = {...cartItem}
          }
          return cartItem
        })
        }
        console.log("tempcart",tempCart);
        localStorage.setItem('Cart', JSON.stringify(tempCart));
        return {...state , cart: tempCart }; 
      }

      if (action.type === INCREASE){
        // return {...state, count: state.count + 1 }
        let tempCart = state.cart.map(cartItem => {
          if (cartItem.id === action.payload.id ){
            cartItem.quantity = cartItem.quantity + 1
            cartItem.total = cartItem.quantity * cartItem.price
            cartItem = {...cartItem}
          }
          return cartItem

        })

        console.log("tempcart",tempCart);
        localStorage.setItem('Cart', JSON.stringify(tempCart));
        return {...state , cart: tempCart };
      }
      if (action.type === REMOVE){
        // return {...state ,count: 0 }
        // console.log(action.payload.id);
        const updatedCart=  {
          ...state,
          cart:state.cart.filter(cartItems => cartItems.id !== action.payload.id)
        }
        localStorage.setItem('Cart', JSON.stringify(updatedCart.cart));


        return{
          ...state,
          cart:state.cart.filter(cartItems => cartItems.id !== action.payload.id)
        }
      }
  
      if (action.type === GET_TOTAL){
        
        console.log("total wala",state);
        let Total = 0;
        // state.cart.map(item => (subTotal += item.total));
        state.cart.map(item => (Total += item.quantity * item.price));
        // const tempTax = subTotal * 0.1;
        // const tax = parseFloat(tempTax.toFixed(2));
        // const total = subTotal + tax;

        // const updatedCart=  {...state , cart: tempCart };
        localStorage.setItem('Total', JSON.stringify(Total));

        return{...state , cartTotal:Total}
      }

      if (action.type === FETCH_DATA){
        // console.log(action.payload.product);
        console.log(action.payload);

        return {...state,product:action.payload}

      }
      if (action.type === LOGOUT){
        return localStorage.clear();

      }

      

    return state
}

export default reducer