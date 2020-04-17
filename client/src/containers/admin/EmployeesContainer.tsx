import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as AdminActionCreators from '../../redux/actions/EmployeesActionCreators';
import Employee from '../../components/admin/employee/EmployeeComponent';
import { RootState } from '../../redux/reducers/RootReducer';

function mapStateToProps(state: RootState) {
    const {employees} = state.employees;
    return {
        employees: employees,
    };
}

function mapDispatchToProps(dispatch: Dispatch<RootState>) {
    return {
        ...bindActionCreators({ ...AdminActionCreators }, dispatch),
    };
}

function EmployeeContainer(props) {
    return <Employee {...props} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeContainer);
