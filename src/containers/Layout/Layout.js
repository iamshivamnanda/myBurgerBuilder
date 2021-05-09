import React, { Component } from 'react';
import classes from './Layout.module.css';
// import Auxilary from '../../hoc/Auxilary/Auxilary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state ={showSideDrawer:false};
    SideDrawerHandler = ()=>{
        this.setState({showSideDrawer:!this.state.showSideDrawer});
    }
    render(){
        return (
            <React.Fragment>
                <SideDrawer open={this.state.showSideDrawer} clicked={this.SideDrawerHandler}></SideDrawer>
           <Toolbar clicked={this.SideDrawerHandler}></Toolbar>
            <main className={classes.Content} >
            {this.props.children}
            </main>
            </React.Fragment>
        );
    }
}

export default Layout;