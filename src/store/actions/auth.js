import * as actionTypes from "./actions";
import axios from "axios";
// import { response } from "express"

export const authStart = ()=>{
    return {
        type:actionTypes.AUTH_START
    };
};

export const authsucess = (idToken,userId)=>{
    return{
        type:actionTypes.AUTH_SUCESS,
        idToken:idToken,
        userId:userId
    }
};
export const authfail = (err)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:err
    }
};

export const logout = ()=>{
    localStorage.clear();
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checktimeout = (expiretimeout)=>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout());
        },expiretimeout*1000);
    }
}

export const auth = (email,password,isSignup)=>{
    return dispatch =>{
        dispatch(authStart());
        const authData = {
            email:email, 
            password:password,
            returnSecureToken:true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCVauuGkzKob_RNuZU4FIStdp6Mg5_OOPI';
        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCVauuGkzKob_RNuZU4FIStdp6Mg5_OOPI';
        }
        axios.post(url,authData)
        .then(response=>{
            console.log(response);
            const expirationTime = new Date(new Date().getTime() + (response.data.expiresIn * 1000) );
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expirationTime',expirationTime);
            localStorage.setItem('userId',response.data.localId);
            dispatch(authsucess(response.data.idToken,response.data.localId));
            dispatch(checktimeout(response.data.expiresIn));
        })
        .catch(err=>{console.log(err.response)
        dispatch(authfail(err.response.data.error.message));
        });
    }
}

export const authautoSignUp = ()=>{
    return dispatch =>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }else{
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            if(expirationTime> new Date()){
                const userId = localStorage.getItem('userId');
                dispatch(authsucess(token,userId));
                // console.log(expirationTime.getTime());
                // console.log((expirationTime.getTime() - new Date().getTime())/1000);
                dispatch(checktimeout((expirationTime.getTime() - new Date().getTime())/1000));
            }else{
                dispatch(logout());
            }
        }
    }
}