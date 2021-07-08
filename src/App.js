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



function App() {
  // const auth = store.userInfo.isAdmin

  return (
    <Router>  
    <Container>
    <PrimarySearchAppBar/>
    {/* <Product/> */}
    </Container>

    <Switch>
      <Route path="/register" component={register}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path='/cart' component={CartContainer}></Route>

      <PrivateRoute path="/add" component={FileUp}></PrivateRoute>
      <Route path="/" component={Product}></Route>
    </Switch>
    </Router>  
    
  );
}





export default App;
