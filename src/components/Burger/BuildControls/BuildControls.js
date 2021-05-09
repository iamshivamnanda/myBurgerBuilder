import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const BuildControls = (props) => {
  const control = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
  ];
  return (
    <div className={classes.BuildControls}>
        <p>Current Price :<strong> {props.price.toFixed(2)}$</strong></p>
      {control.map((el) => (
        <BuildControl
          key={el.label}
          label={el.label}
          addingredient={() => props.addingredient(el.type)}
          removeingredient={()=>props.removeingredient(el.type)}
          disabled={props.disabled[el.type]}
        ></BuildControl>
      ))}
      <button className={classes.OrderButton} disabled={!props.updatehandler} onClick={props.orderd}>Order Now</button>
    </div>
  );
};

export default BuildControls;
