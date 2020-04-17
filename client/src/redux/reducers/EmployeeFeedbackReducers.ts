import { createReducer } from '../../utils/reduxUtils';
import {GET_FEEDBACK_SUCCESS} from '../actions/ActionTypes'
import {ReviewModel} from '../models/ReviewModel'

export interface FeedbacksState {
    feedbacks: ReviewModel[],
};

const initialState: FeedbacksState = {
	feedbacks: []
};

function GetEmployeeFeedbacksDataSuccess(state, actions): FeedbacksState {
    return {
        ...state,
		feedbacks:actions.feedbacks
    };
}

export default createReducer(initialState, {
	[GET_FEEDBACK_SUCCESS]: GetEmployeeFeedbacksDataSuccess,
});
