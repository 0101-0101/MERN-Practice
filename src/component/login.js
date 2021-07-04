import React from 'react'
import { connect } from 'react-redux';
import { USER_SIGNIN_REQUEST } from '../constants/action';

import { Link } from 'react-router-dom';


function login({signin}) {

    // const dispatch = useDispatch()

    const handleSubmit = event => {
        event.preventDefault();
        console.log(event.target.username.value,event.target.password.value)
        // dispatch( {type:dd , payload: event.target.email.value,event.target.password.value})
        signin(event.target.username.value,event.target.password.value)
      }
     

    return (
        <div>
        <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Username</p>
            <input name="username" />
          </label>
        </fieldset>
        
        <fieldset>
          <label>
            <p>password</p>
            <input name="password" />
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
      <p>New user??<Link to='/register'>Register</Link> </p>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return { 
      signin: (username,password) => dispatch( { type:USER_SIGNIN_REQUEST , payload: {username,password}  } )
    //   fetchdata: (product) => dispatch( { type:FETCH_DATA ,payload: { product }})
    }
  }
  
  export default connect(null,mapDispatchToProps)(login);
  