import * as actionTypes from './actions';

export const addingredient = (name)=>{
    return {
        type:actionTypes.ADDINGREDIENT,
        ingredientName:name
    }
}
export const delingredient = (name)=>{
    return {
        type:actionTypes.DELINGREDIENT,
        ingredientName:name
    }
}
