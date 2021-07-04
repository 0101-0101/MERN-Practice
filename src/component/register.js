import React from 'react'
import { connect } from 'react-redux';
import { USER_REGISTER } from '../constants/action';

function register({signin}) {

    // const dispatch = useDispatch()

    const handleSubmit = event => {
        event.preventDefault();
        console.log(event.target);
        console.log(event.target.username.value,event.target.email.value,event.target.password.value)
        // dispatch( {type:dd , payload: event.target.email.value,event.target.password.value})
        signin(event.target.username.value,event.target.email.value,event.target.password.value)
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
            <p>Email</p>
            <input name="email" />
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
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return { 
      signin: (username,email,password) => dispatch( { type:USER_REGISTER , payload: {username,email,password}  } )
    //   fetchdata: (product) => dispatch( { type:FETCH_DATA ,payload: { product }})
    }
  }
  
  export default connect(null,mapDispatchToProps)(register);
  