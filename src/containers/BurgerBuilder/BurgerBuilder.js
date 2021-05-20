import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import classes from "./BurgerBuilder.module.css";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import witherrorhandler from "../../hoc/witherrorhandler/witherrorhandler";

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
    showspinner : false,
  };

  purchasehandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseclosehandler = () => {
    this.setState({ purchasing: false });
  };

  componentDidMount(){
    const query  = new URLSearchParams(this.props.location.search);
    let ingredient = {};
    let price = 4;
    // console.log(query.entries());
    // if(!query.entries()){
    //   return;
    // }
    for(let params of query.entries()){
      if (params[0] === "totalprice") {
        price = +params[1];
      } else {
        ingredient[params[0]] = +params[1];
      }
      // ingredient[params[0]] = +params[1];
      // console.log(params);
    }
    if(Object.keys(ingredient).length === 0 && ingredient.constructor === Object){
      return
    }
    this.setState({ingredients:ingredient,purchaseable:true,totalprice:price});
  }
  purchansecontinuehandler = () => {
    // alert("You Continue!");
   
    const queryParams = [];
    for (const i in this.state.ingredients) {
        queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i])) ;       
      }
      // eslint-disable-next-line no-useless-concat
      queryParams.push('totalprice' + '=' + this.state.totalprice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname:'/Checkout',
      search:'?'+ queryString
    });
    }

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
  render(){
    const disableinfo = { ...this.state.ingredients };
    for (let key in disableinfo) {
      disableinfo[key] = disableinfo[key] === 0;
      // console.log(disableinfo);
    }

    let ordersummary = (
      <OrderSummary
        price={this.state.totalprice}
        ingredients={this.state.ingredients}
        purchaseconfirm={this.purchansecontinuehandler}
        purchasecancel={this.purchaseclosehandler}
      ></OrderSummary>
    );
      if(this.state.showspinner){
        ordersummary = <Spinner></Spinner>
      }

    const modal = this.state.purchasing ? (
      <Modal
        show={this.state.purchasing}
        closed={this.purchaseclosehandler}
      >
        {ordersummary}
      </Modal>
    ) : null;
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

export default witherrorhandler(BurgerBuilder,axios);
