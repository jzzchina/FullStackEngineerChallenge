import { createReducer } from '../../../utils/reduxUtils';
import {GET_REVIEWS_DATA_SUCCESS} from '../../actions/ActionTypes'
import {ReviewModel} from '../../models/ReviewModel'

export interface ReviewsState {
    reviews: ReviewModel[],
};

const initialState: ReviewsState = {
	reviews: []
};

function GetReviewsDataSuccess(state, actions): ReviewsState {
    return {
        ...state,
		reviews:actions.reviews
    };
}

export default createReducer(initialState, {
	[GET_REVIEWS_DATA_SUCCESS]: GetReviewsDataSuccess,
});
