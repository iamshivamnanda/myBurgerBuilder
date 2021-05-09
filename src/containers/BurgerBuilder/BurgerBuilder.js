import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import classes from './BurgerBuilder.module.css';

class BurgerBuilder extends Component {
  ingredientsprice = {
    salad: 0.6,
    bacon: 1.3,
    cheese: 0.7,
    meat: 2.2,
  };

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalprice: 4,
    purchaseable: false,
    purchasing: false,
  };

  purchasehandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseclosehandler = () => {
    this.setState({ purchasing: false });
  };

  purchansecontinuehandler = () => {
    alert("You Continue!");
  };

  updatepurchaseablehandler = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((el) => ingredients[el])
      .reduce((sum, l) => (sum += l), 0);
    // console.log(sum);
    this.setState({ purchaseable: sum > 0 });
  };

  addingredienthandler = (type) => {
    const oldcount = this.state.ingredients[type];
    const updatedcount = oldcount + 1;
    const updatedingredients = { ...this.state.ingredients };
    updatedingredients[type] = updatedcount;

    const ingredientsprice = this.ingredientsprice[type];
    const updatedprice = this.state.totalprice + ingredientsprice;

    this.setState({
      ingredients: updatedingredients,
      totalprice: updatedprice,
    });
    this.updatepurchaseablehandler(updatedingredients);
  };

  removeingredienthandler = (type) => {
    const oldcount = this.state.ingredients[type];
    if (oldcount <= 0) {
      return;
    }
    const updatedcount = oldcount - 1;
    const updatedingredients = { ...this.state.ingredients };
    updatedingredients[type] = updatedcount;

    const ingredientsprice = this.ingredientsprice[type];
    const updatedprice = this.state.totalprice - ingredientsprice;

    this.setState({
      ingredients: updatedingredients,
      totalprice: updatedprice,
    });
    this.updatepurchaseablehandler(updatedingredients);
  };
  render() {
    const disableinfo = { ...this.state.ingredients };
    for (let key in disableinfo) {
      disableinfo[key] = disableinfo[key] === 0;
      // console.log(disableinfo);
    }

    const modal =this.state.purchasing? <Modal show={this.state.purchasing} closed={this.purchaseclosehandler}>
    <OrderSummary
      price={this.state.totalprice}
      ingredients={this.state.ingredients}
      purchaseconfirm={this.purchansecontinuehandler}
      purchasecancel={this.purchaseclosehandler}
    ></OrderSummary>
  </Modal>:null;
    return (
      <React.Fragment>
        {modal}
        <div className={classes.BurgerBuilder}>
        <Burger ingredients={this.state.ingredients}></Burger>
        <BuildControls
          price={this.state.totalprice}
          addingredient={this.addingredienthandler}
          removeingredient={this.removeingredienthandler}
          updatehandler={this.state.purchaseable}
          disabled={disableinfo}
          orderd={this.purchasehandler}
        ></BuildControls>
        </div>
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
