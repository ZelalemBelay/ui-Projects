import { routes } from './app.routes';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { EmployeeService } from './EmployeeService';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AppDialog } from './dialog/app.dialog.component';
import { Router, NavigationEnd } from '@angular/router';
import { Employee } from './Employee';
import { RegisterComponent } from "./register/register/register.component";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, NgFor, NgIf, MatDialogModule, MatButtonModule, RouterModule, NgClass, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Employee Data';
  data: Employee[] = [];

  employee: any;
  dialogRef: any; // Track the open dialog reference
  showMainLayout= true;

  constructor(private router: Router, private employeeService: EmployeeService, private cdr: ChangeDetectorRef, private dialog: MatDialog) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showMainLayout = !event.urlAfterRedirects.startsWith('/contact');
      }
    });
  }

  showRegistration = false;

  onRegistered() {
    console.log('false');
    this.showRegistration = false;
    this.router.navigate(['/']);
    }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: (d) => {
        this.data = d;
        this.data = [... this.data].reverse();
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  currentPage = 1;
itemsPerPage = 5;

paginatedData() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  return this.data.slice(start, start + this.itemsPerPage);
}

totalPagesArray() {
  return Array(Math.ceil(this.data.length / this.itemsPerPage))
    .fill(0)
    .map((_, i) => i + 1);
}

get totalPages() {
  return Math.ceil(this.data.length / this.itemsPerPage);
}

goToPage(page: number) {
  this.currentPage = page;
}

prevPage() {
  if (this.currentPage > 1) this.currentPage--;
}

nextPage() {
  if (this.currentPage < this.totalPages) this.currentPage++;
}

  btAction: any = "";

  onAction(item: any) {
    // Prevent opening a new dialog if one is already open
    if (this.dialogRef) {
      return;
    }

    const btAction = item.isProcessComplete;

    this.dialogRef = this.dialog.open(AppDialog, {
      width: '400px',
      height: 'auto',
      hasBackdrop: true,
      disableClose: true,
      backdropClass: 'mat-dialog-backdrop',
      data: {item, btAction},
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.dialogRef = null; // Reset when dialog is closed
    });

    // Manually trigger change detection
    this.cdr.detectChanges();
  }

  trackByIndex(index: number, item: any) {
    return index;
  }
}
