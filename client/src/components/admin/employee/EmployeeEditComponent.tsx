import React from 'react';
import { Redirect } from 'react-router-dom';
import {EmployeeModel} from '../../../redux/models/EmployeeModel'
import {EditType} from '../../../constants/EditTypes'
import { EmployeesState } from '../../../redux/reducers/admin/EmployeesReducer';
import history from '../../../utils/history'

interface Props {
    editMode: EditType,
    employees: EmployeeModel[],
    updateSuccess: boolean;
    addEmployee(employee: EmployeeModel): void;
    editEmployee(employee: EmployeeModel): void;
    deleteEmployee(employee: EmployeeModel): void;
}

interface State {
    Uid: number,
    AccountId: string;
    Password: string;
    Name: string;
    Role: string;
}


export default class LoginComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            Uid: 0,
            AccountId: '',
            Password: '',
            Name: '',
            Role: 'Admin',
        };
    }

    componentWillMount () {
        const { match, employees, editMode } = this.props;
        if(editMode !== EditType.New){
            const id = parseInt(match.params.id);

            const selectEmployee = employees.find(e => e.Uid === id);
            this.setState({
                ...this.state,
                Uid: selectEmployee.Uid,
                AccountId: selectEmployee.AccountId,
                Password: selectEmployee.Password,
                Name: selectEmployee.Name,
                Role: selectEmployee.Role,
            });
        }
    }

    getCurrentEmployee(){
        const {Uid, AccountId,Password, Name, Role } = this.state;


        const employee: EmployeeModel = {
            Uid:Uid,
            AccountId: AccountId,
            Password: Password,
            Name: Name,
            Role: Role,
        };

        return employee;
    }

    onCreateClick(){
        const {addEmployee} = this.props;
        const employee = this.getCurrentEmployee();

        addEmployee(employee);
    }

    onEditClick(){
        const {editEmployee} = this.props;
        const employee = this.getCurrentEmployee();

        editEmployee(employee);
    }

    onDeleteClick(){
        const {deleteEmployee} = this.props;
        const employee = this.getCurrentEmployee();

        deleteEmployee(employee);
    }

    onBackClick(){
        history.push("/employees");
    }

    render() {
        const {AccountId,Password, Name, Role } = this.state;
        const { editMode } = this.props;

        let title, button;
        if(editMode === EditType.New){
            title = "Create new employee"
            button = <button className="btn btn-primary" onClick={(e) => this.onCreateClick()}>Create</button>;
        }else if(editMode === EditType.Edit){
            title = "Update employee"
            button = <button className="btn btn-primary" onClick={(e) => this.onEditClick()}>Save</button>;
        }else if(editMode === EditType.Delete){
            title = "Delete employee"
            button = <button className="btn btn-primary" onClick={(e) => this.onDeleteClick()}>Delete</button>;
        }

        return(
            <div>
                <div className="col-md-6 col-md-offset-3">
                    <h2>{title}</h2>
                    {/* <form name="form"> */}
                        <div className='form-group'>
                            <label >ID </label>
                            <input type="text" className="form-control" value={AccountId}
                                onChange={e => this.setState({AccountId: e.currentTarget.value}) }/>
                        </div>
                        <div className='form-group'>
                            <label>Password</label>
                            <input type="password" className="form-control" value={Password}
                            onChange={e => this.setState({Password: e.currentTarget.value}) }/>
                        </div>
                        <div className='form-group'>
                            <label>Name</label>
                            <input type="text" className="form-control" value={Name}
                            onChange={e => this.setState({Name: e.currentTarget.value}) }/>
                        </div>
                        <div className='form-group'>
                            <label>Role</label>
                            <select  className="form-control" value={Role} onChange={e => this.setState({Role: e.currentTarget.value})}>
                                <option key="Admin" value="Admin">Admin</option>
                                <option key="Employee" value="Employee">Employee</option>
                            </select>
                        </div>
                        <div className="form-group">
                            {button}
                            <button type="button" style={{float:"right"}} className="btn btn-link" onClick={(e) => this.onBackClick()}>Back to List</button>
                        </div>

                    {/* </form> */}
                </div>
            </div>
        );

    }
}