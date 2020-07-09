import {createStore, combineReducers} from 'redux';
import {DISHES, Dishes} from './dishes';
import {COMMENTS, Comments} from './comments';
import {PROMOTIONS, Promotions} from './promotions';
import {LEADERS, Leaders} from './leaders';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders
        })
    );
    return store;
};