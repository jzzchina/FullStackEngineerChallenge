
import axiosUtils from '../../utils/axiosUtils'
import { GET_EMPLOYEE_DATA_SUCCESS, SET_EDIT_MODE } from './ActionTypes'
import EmployeeTestData from '../testdata/EmployeeTestData'
import {EmployeeModel} from '../models/EmployeeModel'
import history from '../../utils/history';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../redux/reducers/RootReducer';
import {EditType} from '../../constants/EditTypes'

export function getEmployeesData(){
    return (dispatch)=>{
        // const test = EmployeeTestData();


        axiosUtils.get("/employees",{})
            .then((res)=>{
                const data  = res.data;

                dispatch({
                    type: GET_EMPLOYEE_DATA_SUCCESS,
                    employees: data
                });
            })
            .catch(err => {
                // dispatch({
                //     type:GET_EMPLOYEE_DATA_SUCCESS,
                //     employees: EmployeeTestData
                // });
            });
    };
}


export function setEditMode(mode: EditType){
    return (dispatch)=>{
        dispatch({
            type:SET_EDIT_MODE,
            editMode: mode
        });
    };

}

export function addEmployee(employee: EmployeeModel){
    return (dispatch)=>{
        axiosUtils.post("/employees/add",employee)
            .then((data)=>{
                history.push("/employees");
            })
    };
}

export function editEmployee(employee: EmployeeModel){
    return (dispatch)=>{
        axiosUtils.post("/employees/edit",employee)
            .then((data)=>{
                history.push("/employees");
            })
    };
}

export function deleteEmployee(employee: EmployeeModel){
    return (dispatch)=>{
        axiosUtils.post("/employees/delete",employee)
            .then((data)=>{
                history.push("/employees");
            })
    };
}

