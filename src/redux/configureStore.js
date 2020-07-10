import {createStore, combineReducers, applyMiddleware} from 'redux';
import {DISHES, Dishes} from './dishes';
import {COMMENTS, Comments} from './comments';
import {PROMOTIONS, Promotions} from './promotions';
import {LEADERS, Leaders} from './leaders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({ //this is the first parameter here
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders
        }),
        applyMiddleware(thunk, logger) //second parameter
    );
    return store;
};