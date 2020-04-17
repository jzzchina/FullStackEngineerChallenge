import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as ReviewsActionCreators from '../../redux/actions/ReviewsActionCreators';
import Reviews from '../../components/admin/Review/ReviewsComponent';
import { RootState } from '../../redux/reducers/RootReducer';

function mapStateToProps(state: RootState) {
    const {employees} = state.employees;
    const {reviews} = state.reviews;
    return {
        loginId: state.login.accountId,
        employees: employees,
        reviews: reviews,
    };
}

function mapDispatchToProps(dispatch: Dispatch<RootState>) {
    return {
        ...bindActionCreators({ ...ReviewsActionCreators }, dispatch),
    };
}

function ReviewsContainer(props) {
    return <Reviews {...props} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsContainer);
