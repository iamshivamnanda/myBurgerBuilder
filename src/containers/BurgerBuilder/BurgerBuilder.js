import React, { Component } from "react";
import { connect } from "react-redux";
import * as burgerbuilderactions from "../../store/actions/index";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import classes from "./BurgerBuilder.module.css";
import axios from "../../axios-orders";
import witherrorhandler from "../../hoc/witherrorhandler/witherrorhandler";

class BurgerBuilder extends Component {
  state = {
    purchaseable: false,
    purchasing: false,
  };

  purchasehandler = () => {
    this.props.onInitPurchase();
    this.setState({ purchasing: true });
  };

  purchaseclosehandler = () => {
    this.setState({ purchasing: false });
  };

  componentDidMount() {}
  purchansecontinuehandler = () => {
    // alert("You Continue!");
    if(this.props.isAuth){
      this.props.history.push("/Checkout");
    }else{
      this.props.history.push("/auth");
    }
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
            isAuth={this.props.isAuth}
          ></BuildControls>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerbuilder.ingredients,
    price: state.burgerbuilder.totalprice,
    isAuth :state.auth.idToken
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdd: (name) =>
      dispatch(burgerbuilderactions.addingredient(name)),
    onIngredientDel: (name) =>
      dispatch(burgerbuilderactions.delingredient(name)),
    onInitPurchase: () => dispatch(burgerbuilderactions.purchaseinit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(witherrorhandler(BurgerBuilder, axios));
