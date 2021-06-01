import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import witherrorhandler from "../../hoc/witherrorhandler/witherrorhandler";
import * as actions from "../../store/actions/index";


 class ContactData extends Component {
  state = {
    formvalid:false,
    orderform: {
      name: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation:{
          required:true
        },
        valid:false,
        touched:false
      },
      street: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation:{
          required:true
        },
        valid:false,
        touched:false
      },
      zipcode: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
        validation:{
          required:true,
          minlenght:5,
          maxlenght:5,
          isNumeric:true
        },
        valid:false,
        touched:false
      },
      country: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation:{
          required:true
        },
        valid:false,
        touched:false
      },
      email: {
        elementtype: "input",
        elementconfig: {
          type: "email",
          placeholder: "Your E-mail",
        },
        value: "",
        validation:{
          required:true,
          isEmail:true
        },
        valid:false,
        touched:false
      },
      delieveryMethod: {
        elementtype: "select",
        elementconfig: {
          options: [
            { value: "fastest", displayvalue: "Fastest" },
            { value: "cheapest", displayvalue: "Cheapest" },
          ],
        },
        validation:{},
        value: "fastest",
        valid:true
      },
    },
  };
  placeorder = (event) => {
    event.preventDefault();
    const formdata = {};
    for(let formelementindentifier in this.state.orderform){
      formdata[formelementindentifier] = this.state.orderform[formelementindentifier].value;
    }
    // console.log(formdata);
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderdata:formdata,
      userId:this.props.userId
    };

    this.props.onOrderBurger(order,this.props.authtoken);
   
  };

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
    const updatedorderform = {...this.state.orderform};
    const updatedformelement = {...updatedorderform[inputidentifier]};
    updatedformelement.value = event.target.value;
    updatedformelement.valid = this.validcheck(updatedformelement.value,updatedformelement.validation);
    updatedformelement.touched = true;
    updatedorderform[inputidentifier] = updatedformelement;

    let isformvalid = true;

    for(let inputidentifier in updatedorderform){
      isformvalid = updatedorderform[inputidentifier].valid && isformvalid;
    }
    this.setState({orderform:updatedorderform,formvalid:isformvalid});
  }
  render() {
    let formelements = [];
    for (const key in this.state.orderform) {
      formelements.push({
        id: key,
        config: this.state.orderform[key],
      });
    }
    let form = (
      <form onSubmit={this.placeorder}>
        {formelements.map((formel) => (
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
        ))}
        <Button bttnclass="Success" clicked={this.placeorder} disabled={!this.state.formvalid}>
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner></Spinner>;
    }
    return (
      <div className={classes.ContactData}>
        <h3>Enter Your Contact Details.</h3>
        {form}
      </div>
    );
  }
}


const mapStateToProps = (state)=>{
 return{ ings:state.burgerbuilder.ingredients,
  price:state.burgerbuilder.totalprice,
  loading:state.order.loading,
  authtoken:state.auth.idToken,
  userId:state.auth.userId
 }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    onOrderBurger:(orderData,authtoken)=>dispatch(actions.burgerpurchase(orderData,authtoken))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(witherrorhandler(ContactData,axios));