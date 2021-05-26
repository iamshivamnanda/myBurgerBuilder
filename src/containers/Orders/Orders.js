import React, { Component } from "react";
import Order from "../../components/Order/Order";
import * as orderactions from "../../store/actions/index";
import {connect} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount(){
    this.props.fetchorders();
  }

  render() {
    let orders = <Spinner />;
    if(!this.props.loading){
      orders = this.props.orders.map(ord => (<Order key={ord.id} ingredients={ord.ingredients} price={+ord.price} />));
    }
    return (
      <div>
       {orders}
      </div>
    );
  }
}

const mapStateToProps = state=>{
  return {
    orders:state.order.orders,
    loading:state.order.loading
  }
}


const mapDispatchToProps = dispatch =>{
  return {
    fetchorders:()=>dispatch(orderactions.fetchorder())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders);

