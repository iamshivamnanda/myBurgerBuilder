import React from 'react'
import classes from './BuildControl.module.css';
import PropTypes from 'prop-types'

const BuildControl = props => {
    // console.log(props.disabled);
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Less} onClick={props.removeingredient} disabled={props.disabled}> Less</button>
            <button className={classes.More} onClick={props.addingredient}> More</button>
        </div>
    )
}

BuildControl.propTypes = {
    label:PropTypes.string
}

export default BuildControl
