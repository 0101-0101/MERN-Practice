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
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';



import Grid from '@material-ui/core/Grid';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { connect, useDispatch } from "react-redux"
import { ADDTOCART,FETCH_DATA } from "../constants/action"
import {link} from 'react-router-dom'
import { useState } from 'react';

// import {SingleProduct} from './SinglePro's
// import {Product} from '../data'


const useStyles = makeStyles((theme) => ({

  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    height: 100,
    paddingTop: '56.25%', // 16:9
  }

}));
export function RecipeReviewCard({ addtocart,fetchdata,Product}) {
  // console.log(Product);
  const [showAlert, setShowAlert] = useState(null);

  const dispatch = useDispatch()

  const classes = useStyles();


  function fdta(product){
    dispatch( { type:FETCH_DATA ,payload:  product })
  }
  function CartAdd(pro){
    console.log("product",pro);
    setShowAlert(true)
    setTimeout( () => {
      setShowAlert(false)
}, 2000);
    dispatch( { type:ADDTOCART , payload: pro   } )
  }

  useEffect( ()=>{
    fetch('http://localhost:9000/product/list')
      .then(response => response.json())
      .then(product =>{
        console.log("Pro",product.data);
        // fetchdata(product.data)
        // let x =product.data
        dispatch( { type:FETCH_DATA ,payload:  product.data })
        // console.log(product.data)
      }
      ,(error) => {
        if (error) {
          console.log(error);
        }
      })

      // )
  },[] )


  return (
    <div>

 {/* <SingleProduct product={Product} /> */}

     
<Container className={classes.cardGrid} maxWidth="lg">
    {showAlert &&  <Alert severity="success" color="info">
      Product is successfully added to cart — check it out!
    </Alert>}

      <Grid container spacing={3} >
      {Product.map( (pro) =>(
    <Grid key={pro.id} xs={12} sm={6} md={3}>
    <Card style={{margin:'10px'}}>
    <CardHeader
        title={`${pro.title}`}
      />
      <CardMedia
        className={classes.media}
        // image={pro.image} 
        image={`http://localhost:9000/${pro.image}`}
        // image= "https://www.w3schools.com/css/img_mountains.jpg"
        title={`${pro.title}`} />

        {/* <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {pro.title}
          </Typography>
        </CardContent> */}

    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
        
        <FavoriteIcon />
      </IconButton>
      <IconButton onClick={ () => CartAdd(pro) }>
      {/* <IconButton onClick={ ()=> dispatch( { type:ADDTOCART , payload: pro   } ) }> */}

      <ShoppingCartIcon  />
      </IconButton>
      {/* <IconButton aria-label="share">
        <ShareIcon />
      </IconButton> */}

    </CardActions>

  </Card>
  </Grid>
      ))}

  </Grid>
  </Container>
     

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
