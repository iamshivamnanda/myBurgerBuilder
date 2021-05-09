import React from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientssumaary = Object.keys(props.ingredients).map(igkey=> {
        return <li key={igkey}><span style={{textTransform:'capitalize'}}>{igkey}</span>: {props.ingredients[igkey]}</li>
    });

    return (
       <React.Fragment>
           <h3>Your Order</h3>
           <p>A Delicious Burger with the following ingredients: </p>
           <ul style={{textAlign:'left'}}>{ingredientssumaary}</ul>
          <p> <strong>Total Price: {props.price.toFixed(2)}$</strong></p>
           <p>Confirm to Checkout?</p>
           
           <Button bttnclass={"Success"} clicked={props.purchaseconfirm}>Confirm</Button>
           <Button bttnclass={'Danger'} clicked={props.purchasecancel}>Cancel</Button>
       </React.Fragment>
    )
}

export default OrderSummary
