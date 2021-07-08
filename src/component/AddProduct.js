import { useHistory } from "react-router-dom";
import  { useForm} from 'react-hook-form'
import Axios from 'axios'
import { useState } from "react";
import { Alert, AlertTitle } from '@material-ui/lab';

export default function FileUp(){
  const { register ,handleSubmit , formState: { errors }} = useForm();
  const [state, setstate] = useState({ message: ''})

//   const [newUser, setNewUser] = useState(
//     {
//         title : '',
//         price: '',
//         info: '',
//         photo: '',
//     }
// );

// const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('title', newUser.title);
//     formData.append('price', newUser.price);
//     formData.append('info', newUser.info);
//     formData.append('photo', newUser.photo);


//     axios.post('http://localhost:9000/upload', formData)
//          .then(res => {
//             console.log(res);
//          })
//          .catch(err => {
//             console.log(err);
//          });
// }

// const handleChange = (e) => {
//   setNewUser({...newUser, [e.target.name]: e.target.value});
// }

// const handlePhoto = (e) => {
//   setNewUser({...newUser, photo: e.target.files[0]});
//   console.log("e.target.files[0]",e.target.files[0]);
// }

//  return(
// <form onSubmit={handleSubmit} encType='multipart/form-data'>
//           <input 
//               type="text"
//               placeholder="title"
//               name="title"
//               value={newUser.title}
//               onChange={handleChange}
//           />

//           <input 
//               type="text"
//               placeholder="price"
//               name="price"
//               value={newUser.price}
//               onChange={handleChange}
//           />

//           <input 
//               type="text"
//               placeholder="info"
//               name="info"
//               value={newUser.info}
//               onChange={handleChange}
//           />

//           <input 
//               type="file" 
//               accept=".png, .jpg, .jpeg"
//               name="photo"
//               onChange={handlePhoto}
//           />

//           <input 
//               type="submit"
//           />
//       </form>
  // )


  const onSubmit = (data) => { 
    console.log(data);
    console.log(data.file[0]);
    // console.log(typeof(data.title));

    // FormData use "multipart/form-data" &  multer require "multipart/form-data"
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('price', data.price);
    formData.append('info', data.info);
    formData.append('photo',data.file[0])
    console.log("formdata",formData);

    const res  =  Axios.post('http://localhost:9000/upload', formData)
      .then( val=>{ 
         console.log(val) 
         setstate({message:'Prodcut Added SucessFully'})
        })

      .catch(error => {
        console.log("data",error.response.data);
      })
    //   <div>
    //   <Alert severity="error">
    //   <AlertTitle>Product Add</AlertTitle>
    //   Product Added — <strong>check it out!</strong>
    // </Alert>
    // </div>

    }


    return(
      <div style={{width:"500px",margin: "0 auto"}}>
      <div className="result">{ state.message }</div>
    <form onSubmit={handleSubmit(onSubmit)} >   
    <label> Title</label><br/>
  <input  {...register("title", { required: true })} name="title" /><br/>
  <label >Price</label><br/>
  <input  {...register("price", { required: true})} name="price" /><br/>
  <label >Info</label><br/>
  <input {...register("info", { required: true})}  name="info" /><br/>
    <label>
        File Name:
        <br/>
        <input type="file" {...register("file", { required: true})} name="photo" />
    </label>
        {/* <input type="submit" value="Submit" /> */}
        <br/>
        <button type="submit">Submit</button>
      </form>
      </div>
    )

}

