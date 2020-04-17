
import axiosUtils from '../../utils/axiosUtils'
import { GET_REVIEWS_DATA_SUCCESS, SET_REVIEW_MODE } from './ActionTypes'
// import EmployeeTestData from '../testdata/EmployeeTestData'
import {ReviewModel} from '../models/ReviewModel'
import history from '../../utils/history';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../redux/reducers/RootReducer';
import {EditType} from '../../constants/EditTypes'

export function getReviewsData(){
    return (dispatch, getState: () => RootState)=>{
        const state = getState();
        const loginId = state.login.accountId;

        const url = "/reviews?loginId="+ loginId;
        axiosUtils.get(url,{})
            .then((res)=>{
                const data  = res.data;

                dispatch({
                    type: GET_REVIEWS_DATA_SUCCESS,
                    reviews: data
                });
            })
            .catch(err => {
                // dispatch({
                //     type:GET_EMPLOYEE_DATA_SUCCESS,
                //     // employees: EmployeeTestData
                // });
            });
    };
}


export function setReviewEditMode(mode: EditType){
    return (dispatch)=>{
        dispatch({
            type:SET_REVIEW_MODE,
            editMode: mode
        });
    };

}

export function addReview(review: ReviewModel){
    return (dispatch)=>{
        axiosUtils.post("/reviews/add",review)
            .then((data)=>{
                history.push("/reviews");
            })
    };
}

export function editReview(review: ReviewModel){
    return (dispatch)=>{
        axiosUtils.post("/reviews/edit",review)
            .then((data)=>{
                history.push("/reviews");
            })
    };
}

export function deleteReview(review: ReviewModel){
    return (dispatch)=>{
        axiosUtils.post("/reviews/delete",review)
            .then((data)=>{
                history.push("/reviews");
            })
    };
}

