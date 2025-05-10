import { routes } from './app.routes';
import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { EmployeeService } from './EmployeeService';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AppDialog } from './dialog/app.dialog.component';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, NgFor, NgIf, MatDialogModule, MatButtonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Employee Data';
  data = [
    { firstName: 'John', lastName: 'Doe', age: 30, department: 'IT', isProcessComplete: false },
  ];

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

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: (d) => {
        this.data = d;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
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
