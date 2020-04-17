import { createReducer } from '../../../utils/reduxUtils';
import {UPDATE_REVIEWS_SUCCESS, SET_REVIEW_MODE} from '../../actions/ActionTypes'
import {EmployeeEditModel} from '../../models/EmployeeEditModel'

export interface ReviewEditState {
    editMode: string,
    // updateSuccess: boolean,
};

const initialState: ReviewEditState = {
    editMode: "",
    // updateSuccess: false,
};

// function updateReviewsSuccess(state, actions): EmployeeEditState {
//     return {
//         ...state,
// 		updateSuccess:true,
//     };
// }

function setViewEditMode(state, actions): ReviewEditState {
    return {
        ...state,
        editMode: actions.editMode
    };
}

export default createReducer(initialState, {
    // [UPDATE_REVIEWS_SUCCESS]: updateReviewsSuccess,
    [SET_REVIEW_MODE]: setViewEditMode,
});
