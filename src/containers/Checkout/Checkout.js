import React, { Component } from "react";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "../ContactData/ContactData";
export default class checkout extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalprice:4
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    let ingredient = {};
    let price = 4;
    for (let params of query.entries()) {
      if (params[0] === "totalprice") {
        price = +params[1];
      } else {
        ingredient[params[0]] = +params[1];
      }
      // console.log(params);
    }
    this.setState({ ingredients: ingredient, totalprice:price});
    // console.log(this.state.ingredients);
  }
  checkoutcancelhandler = () => {
    const queryParams = [];
    for (const i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    // eslint-disable-next-line no-useless-concat
    queryParams.push('totalprice' + '=' + this.state.totalprice);

    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/",
      search: "?" + queryString,
    });
    // this.props.history.goBack();
    console.log(this.props);
  };

  checkoutcontinuedhandler = () => {
    this.props.history.replace(this.props.match.path + "/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutcancel={this.checkoutcancelhandler}
          checkoutcontinued={this.checkoutcontinuedhandler}
        ></CheckoutSummary>
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              totalprice={this.state.totalprice}
              {...props}
            ></ContactData>
          )}
        ></Route>
      </div>
    );
  }
}
