
import axiosUtils from '../../utils/axiosUtils'
import { GET_FEEDBACK_SUCCESS } from './ActionTypes'
import {FeedbackModel} from '../models/FeedbackModel'
import history from '../../utils/history';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../redux/reducers/RootReducer';

export function getEmployeeFeedbackData(){
    return (dispatch, getState: () => RootState)=>{
        const state = getState();
        const loginId = state.login.accountId;

        const url = "/feedbacks?loginId="+ loginId;
        axiosUtils.get(url,{})
            .then((res)=>{
                const data  = res.data;

                dispatch({
                    type: GET_FEEDBACK_SUCCESS,
                    feedbacks: data
                });
            })
            .catch(err => {
            });
    };
}


export function editFeedbacks(feedback: FeedbackModel){
    return (dispatch)=>{
        axiosUtils.post("/feedbacks/edit",feedback)
            .then((data)=>{
                history.push("/employee-feedback");
            })
    };
}

