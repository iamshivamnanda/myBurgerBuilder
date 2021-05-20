import React from 'react';
import classes from './NavigationItems.module.css';
import {NavLink} from 'react-router-dom'

const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <li><NavLink to='/'  exact activeClassName={classes.active}>Burger Builder</NavLink></li>
            <li><NavLink to='/orders' activeClassName={classes.active}>Orders</NavLink></li>
        </ul>
    )
}

export default NavigationItems
