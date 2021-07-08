import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {
  const userInfo = useSelector((state) => state.userInfo);
  if (userInfo == null){
    var auth = false
  }
 else{
     auth = userInfo.isAdmin
 }

  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/login" />
        )
      }
    ></Route>
  );
}