import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from '../../store/actions/actions';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import classes from "./BurgerBuilder.module.css";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import witherrorhandler from "../../hoc/witherrorhandler/witherrorhandler";

class BurgerBuilder extends Component {
 

  state = {
    purchaseable: false,
    purchasing: false,
    showspinner: false,
  };

  purchasehandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseclosehandler = () => {
    this.setState({ purchasing: false });
  };

  componentDidMount() {
  }
  purchansecontinuehandler = () => {
    // alert("You Continue!");

    this.props.history.push("/Checkout");
  };

  updatepurchaseablehandler = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((el) => ingredients[el])
      .reduce((sum, l) => (sum += l), 0);
    // console.log(sum);
    return sum > 0;
  };

  render() {
    const disableinfo = { ...this.props.ings };
    for (let key in disableinfo) {
      disableinfo[key] = disableinfo[key] === 0;
      // console.log(disableinfo);
    }

    let ordersummary = (
      <OrderSummary
        price={this.props.price}
        ingredients={this.props.ings}
        purchaseconfirm={this.purchansecontinuehandler}
        purchasecancel={this.purchaseclosehandler}
      ></OrderSummary>
    );
    if (this.state.showspinner) {
      ordersummary = <Spinner></Spinner>;
    }

    const modal = this.state.purchasing ? (
      <Modal show={this.state.purchasing} closed={this.purchaseclosehandler}>
        {ordersummary}
      </Modal>
    ) : null;
    return (
      <React.Fragment>
        {modal}
        <div className={classes.BurgerBuilder}>
          <Burger ingredients={this.props.ings}></Burger>
          <BuildControls
            price={this.props.price}
            addingredient={this.props.onIngredientAdd}
            removeingredient={this.props.onIngredientDel}
            updatehandler={this.updatepurchaseablehandler(this.props.ings)}
            disabled={disableinfo}
            orderd={this.purchasehandler}
          ></BuildControls>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { ings: state.ingredients ,price:state.totalprice };
};

const mapDispatchToProps = (dispatch)=>{
  return {
    onIngredientAdd:(name)=> dispatch({type:actionTypes.ADDINGREDIENT,ingredientName:name}),
    onIngredientDel:(name)=> dispatch({type:actionTypes.DELINGREDIENT,ingredientName:name}),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(witherrorhandler(BurgerBuilder, axios));
