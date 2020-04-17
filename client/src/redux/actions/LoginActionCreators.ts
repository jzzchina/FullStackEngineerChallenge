
import axiosUtils from '../../utils/axiosUtils'
import { LOGIN_ADMIN_SUCCESS, LOGIN_EMPLOYEE_SUCCESS } from './ActionTypes'
import {AccountRoleType} from '../../constants/RoleTypes'

export function Login(username: string, password: string){
    return (dispatch)=>{

        var param = {
            username: username,
            password: password
        };

        axiosUtils.post("/login",param)
        .then((req)=>{
            var data = req.data;
            if(data.status == true){
                if(data.Role == "Admin"){
                    dispatch({
                        type:LOGIN_ADMIN_SUCCESS,
                        isLogin: true,
                        role: AccountRoleType.Admin,
                        loginId: username
                    });
                }else{
                    dispatch({
                        type:LOGIN_EMPLOYEE_SUCCESS,
                        isLogin: true,
                        role: AccountRoleType.Employee,
                        loginId: username
                    });
                }
            }else{
                if(username === 'admin' && password === 'admin'){
                    dispatch({
                        type:LOGIN_ADMIN_SUCCESS,
                        isLogin: true,
                        role: AccountRoleType.Admin,
                        loginId: username
                    });
                }
                if(username === 'employee' && password === 'employee'){
                    dispatch({
                        type:LOGIN_EMPLOYEE_SUCCESS,
                        isLogin: true,
                        role: AccountRoleType.Employee,
                        loginId: username
                    });
                }
            }

            // console.log(req)
            // dispatch({
            //     type:GET_MSG,
            //     msg:data.data.msg
            // })
        })

        //TODO
        if(username === 'admin' && password === 'admin'){
            dispatch({
                type:LOGIN_ADMIN_SUCCESS,
                isLogin: true,
                role: AccountRoleType.Admin,
                loginId: username
            });
        }
        if(username === 'employee' && password === 'employee'){
            dispatch({
                type:LOGIN_EMPLOYEE_SUCCESS,
                isLogin: true,
                role: AccountRoleType.Employee,
                loginId: username
            });
        }


    };
}