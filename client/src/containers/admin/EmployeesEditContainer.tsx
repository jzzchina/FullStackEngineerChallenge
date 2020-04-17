import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as EmployeesActionCreators from '../../redux/actions/EmployeesActionCreators';
import EmployeeEdit from '../../components/admin/employee/EmployeeEditComponent';
import Employee from '../../components/admin/employee/EmployeeComponent';
import { RootState } from '../../redux/reducers/RootReducer';

function mapStateToProps(state: RootState) {
    const {updateSuccess, editMode} = state.employeeEdit;
    const {employees} = state.employees;
    return {
        editMode: editMode,
        updateSuccess: updateSuccess,
        employees: employees
    };
}

function mapDispatchToProps(dispatch: Dispatch<RootState>) {
    return {
        ...bindActionCreators({ ...EmployeesActionCreators }, dispatch),
    };
}

function EmployeeEditContainer(props) {
    return <EmployeeEdit {...props} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEditContainer);
