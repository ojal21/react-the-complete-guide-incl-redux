import * as actionTypes from './actionTypes';
import baseClient from '../../client-base';

export const addIngredient = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredientName
    }

};

export const removeIngredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredientName
    }
};

export const initIngredient = () => {
    return dispatch => {
        baseClient.get('/ingredient.json')
            .then(response => {
                dispatch(setIngredient(response.data));
            }).catch(error => {
            dispatch(fetchIngredientFailed());
        });
    }
};

export const setIngredient = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    }
};

export const fetchIngredientFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};