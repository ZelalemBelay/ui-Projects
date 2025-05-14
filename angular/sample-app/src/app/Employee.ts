export class Employee{
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  department: string;
  isProcessComplete: boolean;

  constructor(id: string, firstName: string,  lastName: string, age: number, department: string, salary: number, isProcessComplete: boolean) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.department = department;
    this.isProcessComplete = isProcessComplete;
  }
}
