import { faker } from "@faker-js/faker";

export class Employee {
    _firstName;
    _middleName;
    _lastName;
    _empId;

    get firstName() {
        return this._firstName;
    }
    set firstName(value) {
        this._firstName = value;
    }

    get middleName() {
        return this._middleName;
    }
    set middleName(value) {
        this._middleName = value;
    }

    get lastName() {
        return this._lastName;
    }
    set lastName(value) {
        this._lastName = value;
    }

    get empId() {
        return this._empId;
    }
    set empId(value) {
        this._empId = value;
    }
}

export class EmployeeData {
    getEmployeeData() {
        const employee = new Employee();
        employee.firstName = faker.person.firstName();
        employee.middleName = faker.person.middleName();
        employee.lastName = faker.person.lastName();
        employee.empId = faker.string.numeric(6);

        return employee;
    }
}
