import React from 'react';
import './App.css';
import PrimarySearchAppBar from './component/Navbar'
import Container from '@material-ui/core/Container';

import { Provider } from "react-redux"

import { BrowserRouter as Router, Switch , Route } from 'react-router-dom'
import Product from './component/Product';
import CartContainer from './component/Cart/CartContainer'

import register from './component/register'
import Login from './component/login'

import FileUp from './component/AddProduct'
import PrivateRoute from './component/ProtectedRoute';
import pubg from './component/new_feature'



function App() {
  // const auth = store.userInfo.isAdmin

  return (
    <Router> 
       <Route exact path='/pubg' component={pubg}></Route> 
    <Container>
    <PrimarySearchAppBar/>
    {/* <Product/> */}
    </Container>

    <Switch>
      <Route path="/register" component={register}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path='/cart' component={CartContainer}></Route>
     
      <PrivateRoute path="/add" component={FileUp}></PrivateRoute>
      <Route exact path="/product" component={Product}></Route>
    </Switch>
    </Router>  
    
  );
}





export default App;
