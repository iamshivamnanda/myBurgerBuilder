import React from 'react'
import classes from './Order.module.css'

const Order = (props) => {
    const ingredients = [];
    for(let ingredient in props.ingredients){
        ingredients.push({name:ingredient,amount:props.ingredients[ingredient]})
    }

    const ingredientoutput = ingredients.map(ig=>{
        return <span style={{textTransform:'capitalize',display:'inline-block',margin:'0  0.5rem',border:'1px solid #ccc',padding:'5px'}} key={ig.name}>{ig.name} ({ig.amount})</span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientoutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default Order
