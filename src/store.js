import reducer from './reducers/reducer'
import thunk from 'redux-thunk';
import { createStore,compose,applyMiddleware } from "redux"


const initialStore = {
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
    product:[],
    cart: localStorage.getItem('Cart')
    ? JSON.parse(localStorage.getItem('Cart'))
    : [],
    cartTotal: localStorage.getItem('Total')
    ? JSON.parse(localStorage.getItem('Total'))
    : 0,
    error:''
  }

const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore( reducer , initialStore ,   composeEnhancers(applyMiddleware(thunk)))


export default store;