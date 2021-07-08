import React , { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';


import Grid from '@material-ui/core/Grid';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { connect, useDispatch } from "react-redux"
import { ADDTOCART,FETCH_DATA } from "../constants/action"
import {link} from 'react-router-dom'

// import {SingleProduct} from './SinglePro's
// import {Product} from '../data'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    margin:5,
    marginTop:30
    
  },
  media: {
    height: 100,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    // marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
export function RecipeReviewCard({ addtocart,fetchdata,Product}) {
  // console.log(Product);

  const dispatch = useDispatch()

  const classes = useStyles();

  function fdta(product){
    dispatch( { type:FETCH_DATA ,payload:  product })
  }

  useEffect( ()=>{
    fetch('http://localhost:9000/product/list')
      .then(response => response.json())
      .then(product =>{
        // console.log("Pro",product.data);
        // fetchdata(product.data)
        // let x =product.data
        dispatch( { type:FETCH_DATA ,payload:  product.data })
        // console.log(product.data)
      },(error) => {
        if (error) {
          console.log(error);
        }
      });
      // )
  },[] )


  return (
    <div>

 {/* <SingleProduct product={Product} /> */}

     
    <div>

      <Grid container spacing={2}>
    {Product.map( (pro) =>{
      // <img  src={pro.image} alt="image"></img>
      // console.log("pro",pro);
      console.log(`http://localhost:9000/${pro.image}`);
      return (

    <Grid key={pro.id}>
    <Card className={classes.root}>
    <CardHeader
      avatar={
        <Avatar aria-label="recipe" className={classes.avatar}>
          R
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      // title="Shrimp and Chorizo Paella"
      title={pro.title}

      subheader="September fetchdata14, 2016"
    />
    <CardMedia
      className={classes.media}
      // image={pro.image}
      image={`http://localhost:9000/${pro.image}`}
      // image= "https://www.w3schools.com/css/img_mountains.jpg"
      title="Paella dish"
    />
    <CardContent>
      {/* <Typography variant="body2" color="textSecondary" component="p">
        This impressive paella is a perfect party dish and a fun meal to cook together with your
        guests. Add 1 cup of frozen peas along with the mussels, if you like.
      </Typography> */}
    </CardContent>
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
        <FavoriteIcon />
      </IconButton>
      <IconButton onClick={ ()=> dispatch( { type:ADDTOCART , payload: pro   } ) }>
      <ShoppingCartIcon  />
      </IconButton>
      <IconButton aria-label="share">
        <ShareIcon />
      </IconButton>

    </CardActions>

  </Card>
  </Grid>
      )

    })
  }
  </Grid>
  

   </div>
     

</div>
  )
}

const mapStateToProps = ( store ) => {
  return {Product:store.product}
}

const mapDispatchToProps = (dispatch) => {
  return { 
    addtocart: (product) => dispatch( { type:ADDTOCART , payload:{ product }  } ),
    fetchdata: (product) => dispatch( { type:FETCH_DATA ,payload: { product }})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(RecipeReviewCard);
