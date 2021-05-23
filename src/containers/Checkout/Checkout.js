import React, { Component } from "react";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import ContactData from "../ContactData/ContactData";
class checkout extends Component {
  checkoutcancelhandler = () => {
    this.props.history.push({
      pathname: "/",
    });
    // this.props.history.goBack();
  };

  checkoutcontinuedhandler = () => {
    this.props.history.replace(this.props.match.path + "/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          checkoutcancel={this.checkoutcancelhandler}
          checkoutcontinued={this.checkoutcontinuedhandler}
        ></CheckoutSummary>
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        ></Route>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
  };
};

export default connect(mapStateToProps)(checkout);
