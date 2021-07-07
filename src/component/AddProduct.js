import { useHistory } from "react-router-dom";
import  { useForm} from 'react-hook-form'
import axios from 'axios'
import { useState } from "react";


export default function FileUp(){
  // const { register ,handleSubmit , formState: { errors }} = useForm();


  const [newUser, setNewUser] = useState(
    {
        title : '',
        price: '',
        info: '',
        photo: '',
    }
);

const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newUser.title);
    formData.append('price', newUser.price);
    formData.append('info', newUser.info);
    formData.append('photo', newUser.photo);


    axios.post('http://localhost:9000/upload', formData)
         .then(res => {
            console.log(res);
         })
         .catch(err => {
            console.log(err);
         });
}

const handleChange = (e) => {
  setNewUser({...newUser, [e.target.name]: e.target.value});
}

const handlePhoto = (e) => {
  setNewUser({...newUser, photo: e.target.files[0]});
  console.log("e.target.files[0]",e.target.files[0]);
}




  // const onSubmit = (data) => { 
  //   console.log(data);
  //   // console.log(typeof(data.title));
  //   const title = data.title
  //   const price = data.price
  //   const info = data.info

  //   const storageRef = app.storage().ref()
  //   const fileRef = storageRef.child(file.name)
  //   fileRef.put(file).then(() => {
  //     const res  =  Axios.post('http://localhost:9000/upload', {  title, price , info  ,file })
  //     // .then( val=>{  console.log(val) })

  //     .catch(error => {
  //       console.log("data",error.response.data);
  //     })
  //     console.log("Uploaded a file")
  //   })

  //   // const res  =  Axios.post('http://localhost:9000/upload', {  title, price , info  ,file })
  //   //   // .then( val=>{  console.log(val) })

  //   //   .catch(error => {
  //   //     console.log("data",error.response.data);
  //   //   })
  //   }

    // event.preventDefault()
    // const formdata = new FormData(); 
    // console.log(event.target.name.value);
    // console.log(event.target.photo[0]); 
    // login(data.username,data.password)
    // const x= login(data.username,data.password,history)
    // console.log("x",x);


  //  action="http://localhost:9000/upload" 
    return(

  //   <form onSubmit={handleSubmit(onSubmit)} >
    
  //   <label> Title</label><br/>
  // <input  {...register("title", { required: true })} name="title" /><br/>
  // <label >Price</label><br/>
  // <input  {...register("price", { required: true})} name="price" /><br/>
  // <label >Info</label><br/>
  // <input {...register("info", { required: true})}  name="info" /><br/>
  //   <label>
  //       File Name:
  //       <input type="file" {...register("file", { required: true})} name="photo" />
  //   </label>
  //       {/* <input type="submit" value="Submit" /> */}
  //       <button type="submit">Submit</button>
  //     </form>


  <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <input 
                type="text"
                placeholder="title"
                name="title"
                value={newUser.title}
                onChange={handleChange}
            />

            <input 
                type="text"
                placeholder="price"
                name="price"
                value={newUser.price}
                onChange={handleChange}
            />

            <input 
                type="text"
                placeholder="info"
                name="info"
                value={newUser.info}
                onChange={handleChange}
            />

            <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="photo"
                onChange={handlePhoto}
            />

            <input 
                type="submit"
            />
        </form>

      




    )

}