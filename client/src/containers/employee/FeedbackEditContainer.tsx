import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as EmployeeFeedbackActionCreators from '../../redux/actions/EmployeeFeedbackActionCreators';
import FeedbackEdit from '../../components/employee/FeedbackEditComponent';
import Employee from '../../components/admin/employee/EmployeeComponent';
import { RootState } from '../../redux/reducers/RootReducer';

function mapStateToProps(state: RootState) {
    const {feedbacks} = state.feedbacks;
    return {
        feedbacks: feedbacks
    };
}

function mapDispatchToProps(dispatch: Dispatch<RootState>) {
    return {
        ...bindActionCreators({ ...EmployeeFeedbackActionCreators }, dispatch),
    };
}

function FeedbackEditContainer(props) {
    return <FeedbackEdit {...props} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackEditContainer);
