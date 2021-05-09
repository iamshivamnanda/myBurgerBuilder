import React from "react";
import Logo from "../../UI/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
    let SideDrawerclasses= [classes.SideDrawer,classes.Close];
    if(props.open){
         SideDrawerclasses= [classes.SideDrawer,classes.Open];

    }
  return (
      <React.Fragment>
      <Backdrop show={props.open} closed={props.clicked}></Backdrop>
    <div className={SideDrawerclasses.join(' ')}>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <NavigationItems />
    </div>
    </React.Fragment>
  );
};

export default SideDrawer;
