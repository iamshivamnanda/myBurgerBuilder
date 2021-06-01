import React, { Component } from "react";
import classes from "./Layout.module.css";
import { connect } from "react-redux";
// import Auxilary from '../../hoc/Auxilary/Auxilary';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state = { showSideDrawer: false };
    SideDrawerHandler = () => {
        this.setState({ showSideDrawer: !this.state.showSideDrawer });
    };
    render() {
        return (
            <React.Fragment>
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    clicked={this.SideDrawerHandler}
                ></SideDrawer>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    clicked={this.SideDrawerHandler}
                ></Toolbar>
                <main className={classes.Content}>{this.props.children}</main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.idToken !== null,
    };
};

export default connect(mapStateToProps)(Layout);
