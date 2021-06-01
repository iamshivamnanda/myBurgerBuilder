import * as actiontypes from "./actions";
import axios from "../../axios-orders";

export const burgerpurchasesucess = (id,orderData)=>{
    return {
        type:actiontypes.PURCHASE_BURGER_SUCCESS,
        id:id,
        orderData:orderData
    }
}

export const burgerpurchasesfail = (error)=>{
    return{
        type:actiontypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const burgerpurchasestart = ()=>{
    return {type:actiontypes.PURCHASE_BURGER_START}
}

export const burgerpurchase = (orderData,authtoken)=>{
    return dispatch =>{
        dispatch(burgerpurchasestart());
        axios
        .post("/orders.json?auth="+authtoken, orderData)
        .then((response) => {
        //   console.log(response.data);
         dispatch(burgerpurchasesucess(response.data.name,orderData));
        })
        .catch((error) => {
            dispatch(burgerpurchasesfail(error));
        });
    }
}

export const purchaseinit = ()=>{
    return {
        type:actiontypes.PURCHASE_INIT
    }
}

export const fetchordersucess = (orders)=>{
    return{
        type:actiontypes.FETECH_ORDERS_SUCESS,
        orders:orders
    }
};

export const fetchorderfail = (error)=>{
    return {
        type: actiontypes.FETECH_ORDERS_FAIL,
        error:error
    }
}

export const fetchorderstart = ()=>{
    return {
        type:actiontypes.FETECH_ORDERS_START
    }
}

export const fetchorder = (authtoken,userId)=>{
    return dispatch =>{
        dispatch(fetchorderstart());
        const queryparams = '?auth='+ authtoken +'&orderBy="userId"&equalTo="' +userId +'"'; 
        axios
        .get("/orders.json"+queryparams)
        .then((res) => {
          //   console.log(res);
            const fetchedorder = [];
            for(let key in res.data){
              fetchedorder.push({
                  ...res.data[key],
                  id:key
              })
            }
            dispatch(fetchordersucess(fetchedorder));
        })
        .catch((err) => {
          dispatch(fetchorderfail());
        });
    }
}