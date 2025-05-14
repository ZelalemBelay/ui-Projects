import { Component, OnInit } from '@angular/core';
import { Employee } from './Employee';
import { EmployeeService } from './EmployeeService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register/register.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RegisterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
onCancel() {
    this.showRegistration = false;
}
  title = 'Employee Table';
  data: Employee[] = [];
  showRegistration = false;

  currentPage = 1;
  pageSize = 5;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        this.data = [...res].reverse(); // ✅ newest first
        // Optionally jump to first page on new data
        this.currentPage = 1;
      },
      error: (err) => {
        console.error('Error loading employees:', err);
      },
    });
  }
 // Calculate total pages
 get totalPages(): number {
  return Math.ceil(this.data.length / this.pageSize);
}
  // 🧮 Pagination logic
  paginatedData(): Employee[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.data.slice(startIndex, startIndex + this.pageSize);
  }

  totalPagesArray(): number[] {
    return Array(Math.ceil(this.data.length / this.pageSize))
      .fill(0)
      .map((_, i) => i + 1);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPagesArray().length) {
      this.currentPage++;
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  onRegistered(): void {
    this.showRegistration = false;
    this.loadData(); // ✅ Reload data after registration
  }

  onAction(item: Employee): void {
    // Placeholder for Withdraw / Re-authorize action logic
    console.log('Action on', item);
  }

  trackByIndex(index: number, item: Employee): number {
    return index;
  }
}
