import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

export interface DeviceData {
  name: string;
  status: string;
  lastUpdated: Date;
}

const DEVICE_DATA: DeviceData[] = [
  { name: 'Device 1', status: 'Online', lastUpdated: new Date() },
  { name: 'Device 2', status: 'Offline', lastUpdated: new Date() },
  // Add more devices as needed
];

@Component({
  selector: 'app-device-grid-expanded',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './device-grid-expanded.component.html',
  styleUrls: ['./device-grid-expanded.component.scss']
})
export class DeviceGridExpandedComponent {
  dataSource = DEVICE_DATA;

  getStatusColor(status: string): string {
    switch (status) {
      case 'Online':
        return 'lightgreen';
      case 'Offline':
        return 'lightcoral';
      default:
        return 'lightgray';
    }
  }
}
