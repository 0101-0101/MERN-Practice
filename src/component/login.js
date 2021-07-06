import React from 'react'
import { connect } from 'react-redux';
import { USER_SIGNIN_REQUEST } from '../constants/action';

import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';



function Login({login}) {
  const { register ,handleSubmit , formState: { errors }} = useForm();

    // const dispatch = useDispatch()

    // const onSubmit = event => {
    //     event.preventDefault();
    //     console.log(event.target.username.value,event.target.password.value)
    //     // dispatch( {type:dd , payload: event.target.email.value,event.target.password.value})
       
    //     signin(event.target.username.value,event.target.password.value)
    //   }

      const onSubmit = (data) => {  
        console.log(data);
        // login(data.username,data.password)
        const x= login(data.username,data.password)
        console.log("x",x);
       };
     

    return (
        <div style={{width:"500px",margin: "0 auto"}}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
        <label>
            <p>Username</p>
            <input {...register("username", { required: true, minLength: 3 })} />
            
            {errors.username && errors.username.type === "minLength" && (
              <p className="errorMsg">
                Username should be at-least 3 characters.
              </p>
            )}
            {errors.username && errors.username.type === "required" && (
            <p className="errorMsg">UserName is required.</p>
              )}
            
          </label>
        </fieldset>
        
        <fieldset>
          <label>
            <p>password</p>

            <input {...register("password", { required: true, minLength: 6 })} />
            {/* <p>{errors.password?.type === 'required' && " Password  is required"}</p> */}

            {errors.password && errors.password.type === "required" && (
            <p className="errorMsg">Password is required.</p>
              )}
            {errors.password && errors.password.type === "minLength" && (
              <p className="errorMsg">
                Password should be at-least 6 characters.
              </p>
            )}

            {/* <input type="text"  {...register('password', { required: "Name is required"  })} /> */}

            {/* <input name="password" ref={register({ required: true})} /> */}
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
      login: (username,password) => dispatch( { type:USER_SIGNIN_REQUEST , payload: {username,password}  } )
    //   fetchdata: (product) => dispatch( { type:FETCH_DATA ,payload: { product }})
    }
  }
  
  export default connect(null,mapDispatchToProps)(Login);
  