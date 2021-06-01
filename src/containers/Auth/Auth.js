import React, { Component } from 'react';
import {connect} from "react-redux";
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import Spinner from '../../components/UI/Spinner/Spinner';

 class Auth extends Component {
     state={
        isSignup : true,
         controls:{  
            email: {
                elementtype: "input",
                elementconfig: {
                  type: "email",
                  placeholder: "Mail Address",
                },
                value: "",
                validation:{
                  required:true,
                  isEmail:true
                },
                valid:false,
                touched:false
         },
         password: {
            elementtype: "input",
            elementconfig: {
              type: "password",
              placeholder: "Password",
            },
            value: "",
            validation:{
              required:true,
              minlenght:6,
              isNumeric:true 
            },
            valid:false,
            touched:false
     }
        }
     }
     validcheck = (value,rules)=>{
      let isvalid = true;
      if(rules.required){
        isvalid = value.trim() !== '' && isvalid;
      }
      if(rules.minlenght){
        isvalid = value.length >=rules.minlenght && isvalid;
      }
      if(rules.maxlenght){
        isvalid = value.length <=rules.maxlenght && isvalid;
      }
      if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isvalid = pattern.test(value) && isvalid
    }
  
    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isvalid = pattern.test(value) && isvalid
    }
  
      return isvalid
    }
    inputchangehandler = (event,inputidentifier) =>{
      const updatedControls = {
        ...this.state.controls,
        [inputidentifier]:{
          ...this.state.controls[inputidentifier],
          value:event.target.value,
          valid:this.validcheck(event.target.value,this.state.controls[inputidentifier].validation),
          touched:true
        }
      };
      this.setState({controls:updatedControls});
    } 
    
    submithandler = (event)=>{
      event.preventDefault();
      this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
    }

    switchmethodhandler = ()=>{
      this.setState({isSignup : !this.state.isSignup});
    }

    render() {
      let formelements = [];
      let errorMessage = null;
      for (const key in this.state.controls) {
        formelements.push({
          id: key,
          config: this.state.controls[key],
        });
      }
      let form = formelements.map((formel) => (
            <Input
              key={formel.id}
              elementtype={formel.config.elementtype}
              elementconfig={formel.config.elementconfig}
              value={formel.config.value}
              Invalid={!formel.config.valid}
              shouldvalid = {formel.config.validation}
              touched={formel.config.touched}
              changed = {(event)=>this.inputchangehandler(event,formel.id)}
            />
          ));
        if(this.props.loading){
          form = (<Spinner></Spinner>);
        }
        if(this.props.errormessage){
          errorMessage = (<p>{this.props.errormessage}</p>);
        }
        let authRedirect = null;
        if(this.props.isAuth){
          authRedirect = <Redirect to="/" />
          if(this.props.ischangedprice){
            authRedirect = <Redirect to="/Checkout" />
          }
        }
        
        return (
            <div className={classes.Auth}>
              {authRedirect}
              {errorMessage}
                <form onSubmit={this.submithandler}>
                  {form}
                  <Button clicked={this.submithandler} bttnclass="Success" > Submit</Button>
                </form>
                <Button clicked={this.switchmethodhandler} bttnclass="Danger">Switch To {this.state.isSignup ? "SignIn" : "SignUp"}</Button>
            </div>
        )
    }
}

const mapStateToProps = state =>{
  return{
    loading:state.auth.loading,
    errormessage : state.auth.error,
    isAuth : state.auth.idToken !== null,
    ischangedprice: state.burgerbuilder.totalprice !== 4
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    onAuth : (email,password,isSignup) => dispatch(actions.auth(email,password,isSignup))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);