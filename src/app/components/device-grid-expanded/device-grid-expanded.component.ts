import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

export interface Detail {
  key: string;
  value: string;
}

export interface Grade {
  grade: string;
  price: string;
}

export interface FPCard {
  title: string;
  lastUpdated?: string; // Optional property for the last updated timestamp
  details: Detail[];
  grades: Grade[];
}


@Component({
  selector: 'app-device-grid-expanded',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './device-grid-expanded.component.html',
  styleUrls: ['./device-grid-expanded.component.scss']
})
export class DeviceGridExpandedComponent {
  parentCard = {
    title: 'FP',
    lastUpdated: '2 minutes ago',
    children: [
      {
        title: 'FP1',
        lastUpdated: 'a few seconds ago',
        details: [
          { key: 'Pump', value: 'Active' },
          { key: 'Reader', value: 'Active' },
          { key: 'Pin Pad', value: 'Inactive' },
          { key: 'Screen', value: 'Active' },
          { key: 'Printer', value: 'Inactive' }
        ],
        grades: [
          { grade: 'Grade 1', price: '$3' },
          { grade: 'Grade 2', price: '$3' },
          { grade: 'Grade 3', price: '$5' }
        ]
      },
      {
        title: 'FP2',
        lastUpdated: 'a few seconds ago',
        details: [
          { key: 'Pump', value: 'Active' },
          { key: 'Reader', value: 'Active' },
          { key: 'Pin Pad', value: 'Inactive' },
          { key: 'Screen', value: 'Active' },
          { key: 'Printer', value: 'Inactive' }
        ],
        grades: [
          { grade: 'Grade 1', price: '$3' },
          { grade: 'Grade 2', price: '$3' },
          { grade: 'Grade 3', price: '$5' }
        ]
      },
      {
        title: 'FP3',
        lastUpdated: 'a few seconds ago',
        details: [
          { key: 'Pump', value: 'Active' },
          { key: 'Reader', value: 'Active' },
          { key: 'Pin Pad', value: 'Inactive' },
          { key: 'Screen', value: 'Active' },
          { key: 'Printer', value: 'Inactive' }
        ],
        grades: [
          { grade: 'Grade 1', price: '$3' },
          { grade: 'Grade 2', price: '$3' },
          { grade: 'Grade 3', price: '$5' }
        ]
      }
    ]
  };
  
  getStatusClass(value: string): string {
    switch (value) {
      case 'Active':
        return 'active';
      case 'Inactive':
        return 'inactive';
      default:
        return '';
    }
  }
}