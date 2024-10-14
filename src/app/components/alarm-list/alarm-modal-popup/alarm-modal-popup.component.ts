import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../../data.service'; // Adjust the import based on your folder structure

interface AlertDialogData {
  title: any;
  siteId: string;
  alertType: string;
  alertLevel: number;
}

@Component({
  selector: 'app-alarm-modal-popup',
  standalone: true,
  templateUrl: './alarm-modal-popup.component.html',
  styleUrls: ['./alarm-modal-popup.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
  ],
})
export class AlarmModalPopupComponent {
  siteId: string = '';
  alertType: string = '';
  alertLevel: number = 0;
  isResolveAlarm: boolean = false;
  alertTypes = [
    { label: 'SAF', value: 'saf' },
    { label: 'Stuck Transaction', value: 'stuck_transaction' },
    { label: 'Pump Down', value: 'pump_down' },
    { label: 'Site Down', value: 'site_down' },
  ];
  title: any;

  constructor(
    public dialogRef: MatDialogRef<AlarmModalPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertDialogData,
    private snackBar: MatSnackBar,
    private dataService: DataService // Inject the DataService
  ) {
    this.siteId = data.siteId;
    this.alertType = data.alertType;
    this.alertLevel = data.alertLevel;
    this.title = data.title; // Set title from injected data
    this.isResolveAlarm = false;
    if(data.title &&data.title === 'Resolve Alarm') {
      this.isResolveAlarm = true;
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(action: 'create' | 'resolve'): void {
    if (this.siteId && this.alertType) {
      const alertData = {
        siteId: this.siteId,
        alertType: this.alertType,
        alertLevel: this.alertLevel,
        action: action // Include the action type to differentiate
      };
  
      // Call the API to submit the alert based on action
      this.dataService.submitAlert(alertData).subscribe({
        next: (response) => {
          const message = action === 'create' ? 'Success: Alert Created!' : 'Success: Alert Resolved!';
          this.snackBar.open(response.message || message, 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
          this.clearForm(); // Clear the form fields after success
          this.onClose(); // Close the dialog after submission
        },
        error: (err) => {
          this.snackBar.open('Error: Could not submit the alert. Please try again.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
        }
      });
    } else {
      alert('Please fill in the required fields');
    }
  }
  
  

  // Function to clear form fields
  private clearForm(): void {
    this.siteId = '';
    this.alertType = '';
    this.alertLevel = 0;
  }
}
