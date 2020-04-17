import React from 'react';
import { Redirect } from 'react-router-dom';
import {AccountRoleType} from '../constants/RoleTypes';


interface Props {
    isLogin: boolean;
    role: AccountRoleType;
    Login(username: string, password: string): void;
}

interface State {
    username: string;
    password: string;
}

export default class LoginComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };
    }

    onLoginClick() {
        const { Login } = this.props;
        const { username, password } = this.state;
        Login(username, password);
    }

    renderLoginFrom(){
        const { username, password } = this.state;

        return (
            <div className="col-md-6 col-md-offset-3"  style={{marginTop:"40px"}}  >
                <h2>Login</h2>
                <div className='form-group'>
                    <label htmlFor="username">Username </label>
                    <input type="text" id="username" className="form-control" value={username}
                        onChange={e => this.setState({username: e.currentTarget.value}) }/>
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" value = {password}
                        onChange={e => this.setState({password: e.currentTarget.value}) }/>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" onClick={(e) => this.onLoginClick()}>Login</button>
                </div>
            </div>


        );
    }

    render() {
        const { isLogin, role } = this.props;
        if (isLogin) {
			if (role === AccountRoleType.Admin) {
				return <Redirect to = 'employees' />;
            }
            if (role === AccountRoleType.Employee){
				return <Redirect to="/employee-feedback" />
            }
        }

        return this.renderLoginFrom();

    }
}