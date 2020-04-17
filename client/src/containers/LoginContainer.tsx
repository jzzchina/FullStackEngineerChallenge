import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as LoginActionCreators from '../redux/actions/LoginActionCreators';
import Login from '../components/LoginComponent';
import { RootState } from '../redux/reducers/RootReducer';

function mapStateToProps(state: RootState) {
    const {isLogin, role} = state.login;
    return {
        isLogin: isLogin,
        // accountId: '',
        // email: '',
        // familyName: '',
        // givenName: '',
        role: role,
        // error: ''
    };
}

function mapDispatchToProps(dispatch: Dispatch<RootState>) {
    return {
        ...bindActionCreators({ ...LoginActionCreators }, dispatch),
    };
}

function LoginContainer(props) {
    return <Login {...props} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
