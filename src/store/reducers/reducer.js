import * as actionTypes from '../actions/actions';

const initialstate ={
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
      },
      totalprice: 4,
}

const ingredientsprice = {
    salad: 0.6,
    bacon: 1.3,
    cheese: 0.7,
    meat: 2.2,
  };

const reducer = (state = initialstate,action)=>{
    switch (action.type){
        case actionTypes.ADDINGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName] + 1
                },
                totalprice : state.totalprice + ingredientsprice[action.ingredientName]
            };
        case actionTypes.DELINGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName] - 1
            },
            totalprice : state.totalprice - ingredientsprice[action.ingredientName]
        };
        default:
            return state;
    }
}

export default reducer;