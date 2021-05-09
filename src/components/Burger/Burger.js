import React from "react";
import classes from "./Burger.module.css";
import Burgeringredient from "./Burgeringredient/Burgeringredient";

const Burger = (props) => {
  // console.log(props.ingredients);
  let transformedingredients = Object.keys(props.ingredients).map((igkey) =>{
    // console.log('IG Key ' + igkey);
    // console.log([Array(props.ingredients[igkey])]);
    return[...Array(props.ingredients[igkey])].map((_, i) => {
      // console.log(igkey + ' index  ' + i);
      return(
      <Burgeringredient key={igkey + i} type={igkey}></Burgeringredient>
    )})
  }
  ).reduce((arr,el)=>{
    return arr.concat(el);
  },[]);
  // console.log(transformedingredients);
  if(transformedingredients.length === 0){
    transformedingredients = <p>Please Start adding ingredients</p>
  }
  return (
    <div className={classes.Burger}>
      <Burgeringredient type="bread-top" />
      {transformedingredients}
      <Burgeringredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
