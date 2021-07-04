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
import login from './component/login'



const initialStore = {
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
      <Route path="/login" component={login}></Route>
      <Route path="/" component={Product}></Route>
      <Route path='/cart' component={CartContainer}></Route>
    </Switch>
    </Provider>
    </Router>  
    
  );
}





export default App;
