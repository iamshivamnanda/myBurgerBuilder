import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";

export default class Orders extends Component {
  state = {
    order: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        //   console.log(res);
          const fetchedorder = [];
          for(let key in res.data){
            fetchedorder.push({
                ...res.data[key],
                id:key
            })
          }
        this.setState({ loading: false,order:fetchedorder });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }
  render() {
    return (
      <div>
       {this.state.order.map(ord => (<Order key={ord.id} ingredients={ord.ingredients} price={+ord.price} />))}
      </div>
    );
  }
}
