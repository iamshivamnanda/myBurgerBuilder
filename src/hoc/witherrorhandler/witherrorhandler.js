import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const witherrorhandler = (WrappedComponet,axios)=>{
   
    
    return class extends Component{
        state ={
            error:null
        };
        componentDidMount(){
            axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;

            });
            axios.interceptors.response.use(null,err=>{
                this.setState({error:err});
                return err;
            })
        }
        closeerror =()=>{
            this.setState({error:null});

        }
        render(){
            return (
                <React.Fragment>
                    <Modal show={this.state.error} closed={this.closeerror} >
                     {this.state.error ? this.state.error.message :null}
                    </Modal>
                    <WrappedComponet {...this.props}  />
                </React.Fragment>
                    );
        }
    }
}

export default witherrorhandler;