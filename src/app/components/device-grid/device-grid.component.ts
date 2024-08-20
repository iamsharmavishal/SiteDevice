import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { DeviceGridExpandedComponent } from "../device-grid-expanded/device-grid-expanded.component";

export interface Detail {
  key: string;
  value: string;
}

export interface Detail {
  [key: string]: string; // Adjust if you have other types or structures
}

@Component({
  selector: 'app-device-grid',
  standalone: true,
  imports: [MatCardModule, CommonModule, DeviceGridExpandedComponent],
  templateUrl: './device-grid.component.html',
  styleUrl: './device-grid.component.scss'
})
export class DeviceGridComponent {
  cardList = [
    {
      title: 'Site Controller',
      lastUpdated: '3 minutes ago',
      details: [
        { key: 'VM Status', value: 'Online' },
        { key: 'Host Status', value: 'Connected' }
      ]
    },
    {
      title: 'EPC',
      lastUpdated: '4 minutes ago',
      details: [
        { key: 'SAF Count', value: '0' },
        { key: 'VM Status', value: 'Offline' },
        { key: 'SAF Amount', value: '$0.00' },
        { key: 'Host Status', value: 'Connected' }
      ]
    },
    {
      title: 'POS',
      lastUpdated: '10 minutes ago',
      details: [
        { key: 'VM Status', value: 'Online' },
        { key: 'Host Status', value: 'Connected' }
      ]
    },
    {
      title: 'Pump Controller',
      lastUpdated: '4 minutes ago',
      details: [
        { key: 'VM Status', value: 'Online' },
        { key: 'Host Status', value: 'Connected' }
      ]
    }
  ];

  getStatusClass(key: string, value: string): string {
    switch (value) {
      case 'Online':
        return 'online';
      case 'Offline':
        return 'offline';
      case 'Connected':
        return 'connected';
      case 'Disconnected':
        return 'disconnected';
      default:
        return '';
    }
  }

  // Helper method to determine grid class based on number of details
  getGridClass(details: Detail[]): string {
    return details.length > 2 ? 'details-grid' : 'details-grid single-column';
  }
}