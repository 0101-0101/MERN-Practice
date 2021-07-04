import { connect } from "react-redux"

function Cart({cart}) {
    return (
        <div>
            {cart.map( (item) =>{
                return <h1>{item.title}</h1>
                // console.log(item);
            })}       
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
      "cart":state.cart
    }
  }
  
  export default connect(mapStateToProps)(Cart);
  