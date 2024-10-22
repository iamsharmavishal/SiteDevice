import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../data.service'; // Adjust the import based on your folder structure
import { AlarmModalPopupComponent } from './alarm-modal-popup/alarm-modal-popup.component'; // Adjust the import based on your folder structure
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-alarm-list',
  providers: [DataService],  // Ensure DataService is provided
  standalone: true,
  templateUrl: './alarm-list.component.html',
  styleUrls: ['./alarm-list.component.scss'],
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  
})
export class AlarmListComponent implements OnInit {
  displayedColumns: string[] = ['siteId', 'alertType', 'alertLevel', 'action'];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.fetchAlerts();
  }

  fetchAlerts(): void {
    this.dataService.getSubmittedAlerts().subscribe({
      next: (alerts) => {
        this.dataSource.data = alerts; // Set the alert data to the table
      },
      error: (err) => {
        console.error('Failed to fetch alerts', err);
        this.snackBar.open('Error: Could not load alerts.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    });
  }

  openAlertDialog(alarm?: any): void {
    if(alarm != undefined && alarm){
      alarm.title = alarm ? 'Resolve Alarm' : 'Create Alarm';
    }
    
    const dialogRef = this.dialog.open(AlarmModalPopupComponent, {
      //width: '400px',
      data: alarm ? { ...alarm } : { siteId: '', alertType: '', alertLevel: 0, title:  'Create Alarm' }
    });
  
    dialogRef.afterClosed().subscribe(() => {
      this.fetchAlerts(); // Refresh the alert list after the dialog is closed
    });
  }
  


  onSubmit(action: 'create' | 'resolve', alert: any): void {
    // Handle resolve logic here (you can modify this to handle alert resolution)
  }
}
