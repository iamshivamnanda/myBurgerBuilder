import React, { Component } from "react";
import Order from "../../components/Order/Order";
import * as orderactions from "../../store/actions/index";
import {connect} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import witherrorhandler from "../../hoc/witherrorhandler/witherrorhandler";
import axios from "../../axios-orders";

class Orders extends Component {
  componentDidMount(){
    this.props.fetchorders(this.props.authtoken,this.props.userId);
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
    loading:state.order.loading,
    authtoken:state.auth.idToken,
    userId:state.auth.userId
  }
}


const mapDispatchToProps = dispatch =>{
  return {
    fetchorders:(authtoken,userId)=>dispatch(orderactions.fetchorder(authtoken,userId))
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(witherrorhandler(Orders,axios));

