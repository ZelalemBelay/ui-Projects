import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { EmployeeService } from '../../EmployeeService';
import { Employee } from '../../Employee';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  @Output() registered = new EventEmitter<void>();

  constructor (private employeeService: EmployeeService) {}
  employee: Employee = new Employee('', '', '', 0, '', 0, false);
  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: (d) => {
        this.employee.id = 'E'+ (d.length + 1);
        console.log('Employee ID:', this.employee.id);
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  submitForm() {
    console.log('Form submitted');
    this.employeeService.insertEmployees(this.employee).subscribe({
      next: (response) => {
        console.log('Employee registered successfully:', response);
      },
      error: (error) => {
        console.error('Error registering employee:', error);
      },
    })

    this.registered.emit();
  }
}
