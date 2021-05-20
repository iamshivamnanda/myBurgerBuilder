import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
    let inputelement = null;
    const inputclasses = [classes.InputElement];
    if(props.Invalid && props.shouldvalid && props.touched){
        inputclasses.push(classes.Invalid);
    }
    switch(props.elementtype){
        case 'input':
        inputelement = <input className={inputclasses.join(' ')} {...props.elementconfig} value={props.value} onChange={props.changed}></input>
        break
        case 'textarea':
        inputelement = <textarea  className={inputclasses.join(' ')}{...props.elementconfig} value={props.value} onChange={props.changed}></textarea>
        break
        case 'select':
        inputelement = <select  className={inputclasses.join(' ')} value={props.value} onChange={props.changed}>
            {props.elementconfig.options.map(op=>(<option key={op.value} value={op.value}>{op.displayvalue}</option>))}
        </select>
        break
        default:
            inputelement = <input className={inputclasses.join(' ')} {...props.elementconfig} value={props.value} onChange={props.changed}></input>
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}></label>
            {inputelement}
        </div>
    )
}

export default Input
