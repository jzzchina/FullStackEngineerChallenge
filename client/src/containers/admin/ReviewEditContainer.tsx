import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as ReviewsActionCreators from '../../redux/actions/ReviewsActionCreators';
import ReviewEdit from '../../components/admin/Review/ReviewEditComponent';
import Employee from '../../components/admin/employee/EmployeeComponent';
import { RootState } from '../../redux/reducers/RootReducer';

function mapStateToProps(state: RootState) {
    const {editMode} = state.reviewEdit;
    const {employees} = state.employees;
    const {reviews} = state.reviews;
    return {
        loginId: state.login.accountId,
        editMode: editMode,
        employees: employees,
        reviews: reviews,
    };
}

function mapDispatchToProps(dispatch: Dispatch<RootState>) {
    return {
        ...bindActionCreators({ ...ReviewsActionCreators }, dispatch),
    };
}

function ReviewEditContainer(props) {
    return <ReviewEdit {...props} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewEditContainer);
