import React from 'react';
import './App.css';
import PrimarySearchAppBar from './component/Navbar'
import Container from '@material-ui/core/Container';

import { createStore,compose,applyMiddleware } from "redux"
import { Provider } from "react-redux"
import reducer from './reducers/reducer'

import { BrowserRouter as Router, Switch , Route } from 'react-router-dom'
import Product from './component/Product';
import CartContainer from './component/Cart/CartContainer'

import thunk from 'redux-thunk';
import register from './component/register'
import Login from './component/login'

import FileUp from './component/AddProduct'



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
}

const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore( reducer , initialStore ,   composeEnhancers(applyMiddleware(thunk)))


function App() {
  return (
    <Router>  
    <Provider store={ store }>

    <Container>
    <PrimarySearchAppBar/>
    {/* <Product/> */}
    </Container>

    <Switch>
      <Route path="/register" component={register}></Route>
      <Route path="/add" component={FileUp}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path='/cart' component={CartContainer}></Route>

      <Route path="/" component={Product}></Route>
    </Switch>
    </Provider>
    </Router>  
    
  );
}





export default App;
