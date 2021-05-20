import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h3>Hope The Burger Tastes Well!</h3>
            <div className={classes.Burger}>
            <Burger ingredients ={props.ingredients}/>
            </div>
            <Button bttnclass='Danger' clicked={props.checkoutcancel}>Cancel</Button>
            <Button bttnclass='Success' clicked={props.checkoutcontinued}>Continue</Button>
        </div>
    )
}

export default CheckoutSummary
