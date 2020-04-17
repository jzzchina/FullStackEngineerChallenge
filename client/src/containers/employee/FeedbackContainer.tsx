import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as EmployeeFeedbackActionCreators from '../../redux/actions/EmployeeFeedbackActionCreators';
import Feedback from '../../components/employee/FeedbackComponent';
import { RootState } from '../../redux/reducers/RootReducer';

function mapStateToProps(state: RootState) {
    const {feedbacks} = state.feedbacks;
    return {
        loginId: state.login.accountId,
        feedbacks: feedbacks,
    };
}

function mapDispatchToProps(dispatch: Dispatch<RootState>) {
    return {
        ...bindActionCreators({ ...EmployeeFeedbackActionCreators }, dispatch),
    };
}

function FeedbackContainer(props) {
    return <Feedback {...props} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackContainer);
