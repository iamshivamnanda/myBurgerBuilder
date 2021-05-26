import * as actionTypes from "../actions/actions";

const initialstate = {
  orders: [],
  loading: false,
  purchaseable:false
};
const reducer = (state = initialstate, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return{
                ...state,
                purchaseable:false
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {...action.orderData,id:action.id};
            return {
                ...state,
                purchaseable:true,
                loading:false,
                orders:state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading:false
            };
        case actionTypes.PURCHASE_BURGER_START:
            return{
                ...state,
                loading:true
            }
        case actionTypes.FETECH_ORDERS_START:
            return{
                ...state,
                loading:true
            }
        case actionTypes.FETECH_ORDERS_SUCESS:
           return {
               ...state,
               orders: action.orders,
               loading:false
           }
        case actionTypes.FETECH_ORDERS_FAIL:
            return{
                ...state,
                loading:false
            }
        default:
            return state;
    }
};

export default reducer;