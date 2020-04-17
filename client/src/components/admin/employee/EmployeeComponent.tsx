import React from 'react';
import {EmployeeModel} from '../../../redux/models/EmployeeModel'
import { Link, NavLink } from 'react-router-dom';
import {EditType} from '../../../constants/EditTypes'
import history from '../../../utils/history'

interface Props {
    employees: EmployeeModel[];
    getEmployeesData(): void;
    setEditMode(mode: EditType): void;
}

export default class LoginComponent extends React.Component<Props, {}> {
    componentWillMount() {

        var {getEmployeesData} = this.props;
        getEmployeesData();
    }

    updateEmployees(mode: EditType, id?: number){
        var {setEditMode} = this.props;

        setEditMode(mode);
        if(mode === EditType.New){
            history.push("/employees/add");
        }else if(mode === EditType.Edit){
            history.push("/employees/edit/" + id);
        }else if(mode === EditType.Delete){
            history.push("/employees/delete/" + id);
        }
    }

    renderTable(){
        const {employees} = this.props;
        if(employees.length === 0)
            return null;


        return employees.map((item) => {
            return ([
              <tr key={'Row_' + item.Uid}>
                <td>{item.AccountId}</td>
                <td>{item.Name}</td>
                <td>{item.Role}</td>
                <td>
                    <button type="button" className="btn btn-link" onClick={(e) => this.updateEmployees(EditType.Edit, item.Uid)}>Edit</button> |
                    <button type="button" className="btn btn-link" onClick={(e) => this.updateEmployees(EditType.Delete, item.Uid)}>Delete</button>
                </td>
              </tr>
            ]);
          });
    }

    render() {
        return(
            <div>
               <p><button type="button" className="btn btn-link" onClick={(e) => this.updateEmployees(EditType.New)}>Create new employee</button></p>
               <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Role</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>

                    <tbody>
                     {this.renderTable()}
                    </tbody>
                </table>
            </div>
        );

    }
}