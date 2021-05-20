import React from 'react';
import './App.css';
import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Layout>
        <Switch>
        <Route path='/Checkout' component={Checkout} ></Route>
        <Route path='/orders' component={Orders} ></Route>
        <Route path='/' component={BurgerBuilder} ></Route>
        </Switch>
      </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
