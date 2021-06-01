import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const witherrorhandler = (WrappedComponet,axios)=>{
   
    
    return class extends Component{
        state ={
            error:null
        };
        componentWillMount(){
            this.reqInterceptor =   axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;

            });
            this.reqInterceptor =   axios.interceptors.response.use(null,err=>{
                console.log(err.response.statusText);
                this.setState({error:err.response.statusText});
                return err;
            })
        }
        componentWillUnmount () {
            axios.interceptors.request.eject( this.reqInterceptor );
            axios.interceptors.response.eject( this.resInterceptor );
        }
        closeerror =()=>{
            this.setState({error:null});

        }
        render(){
            return (
                <React.Fragment>
                    <Modal show={this.state.error} closed={this.closeerror} >
                     {this.state.error ? this.state.error :null}
                    </Modal>
                    <WrappedComponet {...this.props}  />
                </React.Fragment>
                    );
        }
    }
}

export default witherrorhandler;