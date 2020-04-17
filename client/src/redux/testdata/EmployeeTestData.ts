import {EmployeeModel} from '../models/EmployeeModel';

export default function createEntities(): EmployeeModel[] {
    return [
        { Uid: 1, AccountId: 'TestAccount1', Name: 'Test Name1', Role: 'Admin', Password: "" },
        { Uid: 2, AccountId: 'TestAccount1', Name: 'Test Name2', Role: 'Employee', Password: "" },
        { Uid: 3, AccountId: 'TestAccount1', Name: 'Test Name3', Role: 'Employee', Password: "" },
    ];
}
