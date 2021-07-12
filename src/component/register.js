import React from 'react'
import { connect } from 'react-redux';
import { USER_REGISTER } from '../constants/action';

import { useForm } from 'react-hook-form';
import Axios from 'axios'

import { useHistory } from "react-router-dom";



function Register({signin}) {
  const history = useHistory();

  const { register ,handleSubmit , setError ,formState: { errors }} = useForm();


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

        const username = data.username
        const email = data.email
        const password = data.password
        try {  
          const data  =  Axios.post('http://localhost:9000/api/auth/signup/', { username , email , password })
          .then(data =>{ 
            // localStorage.setItem('userInfo', JSON.stringify(data)); 
            // console.log(data);
            history.push('/login')
              })
          .catch(error => {
            console.log("data",error.response.data);

            setError("username", {
              type: "manual",
              message: `${error.response.data.message}`,
            });
          })
        }catch (error) {
            // console.log("Error:",error);
          } 
          };
     

    return (
        <div style={{width:"500px",margin: "0 auto"}}>
          <h1>Register Page</h1>
        {errors.username && <p>{errors.username.message}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
        <label>
            <p>Username</p>
            <input {...register("username", { required: true, minLength: 3 })} />
            {errors.username && errors.username.type === "minLength" && (
              <p className="errorMsg">
                username should be at-least 3 characters.
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
  