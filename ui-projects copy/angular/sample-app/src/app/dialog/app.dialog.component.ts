import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../EmployeeService';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{data.btAction? "Withdrawal Process: ": "Re-Authorizing:"}}  Are you Sure?</h2>
    <mat-dialog-content>
      <p>Employee: {{ data.item.firstName }} {{ data.item.lastName }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button  mat-button mat-dialog-close class="btn btn active btn-sm">Cancel</button>
      <button mat-button *ngIf="data.btAction" class="btn btn-danger active btn-sm" (click)="onConfirm()">Withdraw</button>
      <button mat-button *ngIf="!data.btAction" class="btn btn-success active btn-sm" (click)="onConfirm()">Re Authorize</button>
    </mat-dialog-actions>
  `
})
export class AppDialog {
  constructor(
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<AppDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { item: any, btAction: boolean }) { }

    loading = false;  // Add a loading state to show/hide the spinner

  onConfirm() {
    this.employeeService.saveEmployees(this.data.item).subscribe({
      next: (response) => {
        Object.assign(this.data.item, response);
        console.log('POST request successful', response);
      },
      error: (error) => {
        console.error('Error in POST request', error);
      },
      complete: () => {
        this.loading = false;  // Set loading state to false when the request is complete
      }
    });

    this.dialogRef.close('confirmed');
  }
}
