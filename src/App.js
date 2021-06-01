import React from 'react';
import './App.css';
import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import LogOut from './containers/Auth/LogOut/LogOut';
import { connect } from 'react-redux';

import * as actions from "./store/actions/index";
import { Component } from 'react';

class App extends Component {
  componentDidMount(){
    this.props.onAuthSignUp();
  }
  render(){
    let route = (<Switch>
      <Route path='/auth' component={Auth} ></Route>
      <Route path='/' component={BurgerBuilder} ></Route>
      <Redirect to = "/"></Redirect>
      </Switch>);

      if(this.props.isAuth){
        route = (<Switch>
          <Route path='/Checkout' component={Checkout} ></Route>
          <Route path='/auth' component={Auth} ></Route>
          <Route path='/logout' component={LogOut} ></Route>
          <Route path='/orders' component={Orders} ></Route>
          <Route path='/' component={BurgerBuilder} ></Route>
          <Redirect to = "/"></Redirect>
          </Switch>);
      }
  return (
    <div className="App">

      <BrowserRouter>
      <Layout>
        {route}
      </Layout>
      </BrowserRouter>
    </div>
  );
}
}

const mapStateToProps = state =>{
  return {
    isAuth : state.auth.idToken !== null
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    onAuthSignUp : ()=> dispatch(actions.authautoSignUp())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
