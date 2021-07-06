import React from 'react'
import { connect } from 'react-redux';
import { USER_REGISTER } from '../constants/action';

import { useForm } from 'react-hook-form';


function Register({signin}) {
  const { register ,handleSubmit , formState: { errors }} = useForm();


    // const dispatch = useDispatch()

    // const handleSubmit = event => {
    //     event.preventDefault();
    //     console.log(event.target);
    //     console.log(event.target.username.value,event.target.email.value,event.target.password.value)
    //     // dispatch( {type:dd , payload: event.target.email.value,event.target.password.value})
    //     signin(event.target.username.value,event.target.email.value,event.target.password.value)
    //   }

      const onSubmit = (data) => {  
        console.log(data);
        signin(data.username,data.email,data.password)

        
       };
     

    return (
        <div style={{width:"500px",margin: "0 auto"}}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
        <label>
            <p>Username</p>
            <input {...register("username", { required: true, minLength: 4 })} />
            {errors.username && errors.username.type === "minLength" && (
              <p className="errorMsg">
                username should be at-least 4 characters.
              </p>
            )}
            {errors.username && errors.username.type === "required" && (
            <p className="errorMsg">UserName is required.</p>
              )}
            
          </label>
        </fieldset>
        <fieldset>
            <label>
                <p>Email</p>
                <input {...register("email", { required: true,pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/  })} />
                <p>{errors.email?.type === 'required' && " email is required"}</p>
                {errors.email && errors.email.type === "pattern" && (
                <p className="errorMsg">Email is not valid.</p>
              )}
              </label>
        </fieldset>
        <fieldset>
          <label>
            <p>password</p>
            <input {...register("password", { required: true, minLength: 6 })} />
            {errors.password && errors.password.type === "required" && (
            <p className="errorMsg">Password is required.</p>
              )}
            {errors.password && errors.password.type === "minLength" && (
              <p className="errorMsg">
                Password should be at-least 6 characters.
              </p>
            )}
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
  
  export default connect(null,mapDispatchToProps)(Register);
  