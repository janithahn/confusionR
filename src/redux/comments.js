import {COMMENTS} from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state=COMMENTS, action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            return state.concat(comment); //can't change the state directly from here(unable to mutate). So we have to modify it
        default:
            return state;
    }
};