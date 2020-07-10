import * as ActionTypes from './ActionTypes';

export const Promotions = (state = {
        isLoading: true,
        errMess: null,
        promotions: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_PROMOS:
            return {...state, isLoading: false, errMess: null, promotions: action.payload};

        case ActionTypes.PROMOS_LOADING:
            return {...state, isLoading: true, errMess: null, promotions: []}; //can't change the state directly from here(unable to mutate). So we have to modify it
            
        case ActionTypes.PROMOS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, promotions: []};

        default:
            return state;
    }
};