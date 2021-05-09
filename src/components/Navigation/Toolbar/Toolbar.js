import React from 'react'
import classes from './Toolbar.module.css';
import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div className={classes.DrawerToggle} onClick={props.clicked}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <Logo />
            <nav className={classes.DesktopOnly}>
           <NavigationItems />
           </nav>
        </header>
    )
}

export default Toolbar
