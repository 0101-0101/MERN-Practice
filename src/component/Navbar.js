import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { Link, useHistory } from 'react-router-dom';
import {connect, useDispatch} from "react-redux"
import {LOGOUT , FETCH_DATA } from '../constants/action'
import { useSelector } from 'react-redux';



const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },backgroundColor: theme.palette.background.paper,
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export function PrimarySearchAppBar({totalcart,userInfo}) {

  function searchProduct(e){
    e.preventDefault()
    console.log(e.target.value);
    const val = e.target.value
    fetch (`http://localhost:9000/search?value=${val}`, {
      method: 'POST',
        })
        .then (response => response.json ())
        .then (response => {
            console.log(response)
            // setProducts(response)
            dispatch( { type:FETCH_DATA,payload: response } ) 
        })
        .catch (error => {
            console.error (error);
        });
  }
  var history = useHistory();

  const dispatch = useDispatch()
  // var userInfo = useSelector((state) => state.userInfo);

  var value = ""
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      {/* <MenuItem onClick={ ()=> dispatch( { type:LOGOUT,payload: {history} } ) } >logout</MenuItem> */}
      {/* <Link to='/login'>Login</Link> */}
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>product5
      </MenuItem>

      {/* <p> { JSON.parse(localStorage.getItem('userInfo').username) } </p> */}

    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>

            <Link to='/product' style={{"text-decoration": "none","color":"white"}}>E-Commerce</Link>
 
          </Typography>
          <div className={classes.search}>
            {/* <div className={classes.searchIcon}>
              <SearchIcon />
            </div> */}
            {/* <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              
            /> */}

{/* <form className="product--SearchForm" onSubmit={searchProduct}> */}
                            <input type="text" onChange={searchProduct} name="search" placeholder="Search..."/>
                            {/* <input type="submit" value="search"/> */}
                        {/* </form> */}

          </div>
          

          <div className={classes.grow} />
          {/* <p> { JSON.parse(localStorage.getItem('userInfo').username) } </p> */}

              
          {Object.keys(localStorage).forEach((key) => {
            if (key =='userInfo'){
            value = JSON.parse(localStorage.getItem(key));
          console.log(JSON.parse(localStorage.getItem(key)));
         <p>{value.username}</p>
            }
          // return (
          //   <div >
          //     {value.username?<p>{value.username}</p> : <Link to='/login'>Login</Link>}
              
          //   </div>
          // );
          
          })}


{/* 
          {Object.entries(localStorage).map(([key, valueJSON]) => {
       const value = JSON.parse(valueJSON);
      //  console.log( JSON.parse(valueJSON) );

        return (
          <div >
            {value.username?<p>{value.username}</p> : <Link to='/login'>Login</Link>}
            
          </div>
        );
      })} */}
          { userInfo && userInfo.isAdmin && <Link to='/add' style={{"text-decoration": "none","color":"white"}}>Add Product</Link>}
          

          
          <div className={classes.sectionDesktop}>

            {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton> */}

            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={totalcart} color="secondary">
                {/* <NotificationsIcon /> */}
                <Link to="/cart" style={{color:"white"}}>
                <ShoppingCartIcon/>
        </Link>
               
              </Badge>
            </IconButton>
            {/* <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
          </div>
          <div className={classes.sectionMobile}>

            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
            
          </div>
          {/* {userInfo && <button onClick={ ()=> dispatch( { type:LOGOUT,payload: {history} } ) } ></button>} */}
          {userInfo ? <button onClick={ ()=> dispatch( { type:LOGOUT,payload: {history} } ) } >logout</button> : <Link to='/login' style={{"text-decoration": "none",color:"white"}}><h3>Login</h3></Link> }
          {/* {value.username?<p>Hello,{value.username}</p> : <Link to='/login'>Login</Link>} */}


        </Toolbar>
        
      </AppBar>
      {renderMobileMenu}
      {/* {renderMenu} */}
      
    </div>
  );
}

function mapStateToProps(store){
  let total_quantity = 0
  store.cart.map((item) => {
    total_quantity += item.quantity 
  
  })

  
  // console.log("length",store.cart.length);
  return { totalcart:total_quantity , userInfo :store.userInfo}
}

export default connect(mapStateToProps)(PrimarySearchAppBar);