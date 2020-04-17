import { createReducer } from '../../../utils/reduxUtils';
import {UPDATE_EMPLOYEE_SUCCESS, SET_EDIT_MODE} from '../../actions/ActionTypes'
import {EmployeeEditModel} from '../../models/EmployeeEditModel'

export interface EmployeeEditState {
    editMode: string,
    updateSuccess: boolean,
};

const initialState: EmployeeEditState = {
    editMode: "",
    updateSuccess: false,
};

function updateEmployeesSuccess(state, actions): EmployeeEditState {
    return {
        ...state,
		updateSuccess:true,
    };
}

function setEditMode(state, actions): EmployeeEditState {
    return {
        ...state,
        editMode: actions.editMode
    };
}

export default createReducer(initialState, {
    [UPDATE_EMPLOYEE_SUCCESS]: updateEmployeesSuccess,
    [SET_EDIT_MODE]: setEditMode,
});
