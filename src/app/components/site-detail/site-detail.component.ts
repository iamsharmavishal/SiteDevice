import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { DataService, DynamicCard, Detail, Transaction, PriceStatus } from '../../data.service'; 
import { HttpClientModule } from '@angular/common/http';

export interface TankCard {
  title: string;
  alertStatus : string;
  fillPercentage: number; // Percentage of the tank fill
  capacity: number; // Capacity of the tank
  volume: number; // Current volume in the tank
}
@Component({
  selector: 'app-site-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    CommonModule,
    MatTableModule,
    HttpClientModule
  ],
  templateUrl: './site-detail.component.html',
  styleUrls: ['./site-detail.component.scss']
})
export class SiteDetailComponent implements OnInit {
  siteInfo = {
    number: '4352',
    details: '123 Radiant VTX 7749'
  };

  dateOptions = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last 7 Days', value: 'last7days' }
  ];

  outdoorTransaction: Transaction = {
    label: 'Outdoor Transaction',
    value: 2000
  };

  indoorTransaction: Transaction = {
    label: 'Indoor Transaction',
    value: 1500
  };

  priceStatusData: PriceStatus[] = [
    { name: 'Patrol', pole: 'Active', price: 100 },
    { name: 'Diesel', pole: 'Inactive', price: 150 },
    { name: 'Grade 1', pole: 'Active', price: 200 },
    { name: 'Grade 2', pole: 'Active', price: 250 },
    { name: 'Grade 3', pole: 'Inactive', price: 300 }
  ];

  displayedColumns: string[] = ['name', 'pole', 'price'];

  cardList: any[] = [];
  tankCards: TankCard[] = [];
  dynamicPumpStatusCards: DynamicCard[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchExistingData();
    this.fetchNewContainerData();
    this.tankCards = [
      {
        title: 'Tank 1 Unleaded',
        alertStatus: 'Alert: Low',
        fillPercentage: 80,
        capacity: 200,
        volume: 2000
      },
      {
        title: 'Tank 2 Diesel',
        alertStatus: 'Alert: Normal',
        fillPercentage: 60,
        capacity: 300,
        volume: 2500
      },
      {
        title: 'Tank 3 Premium',
        alertStatus: 'Alert: High',
        fillPercentage: 90,
        capacity: 400,
        volume: 3000
      }
    ];
  }

  fetchExistingData(): void {
    this.dataService.getExistingData().subscribe(data => {
      // Handle existing data here
      console.log('Existing Data:', data);
      // Update `cardList` or other properties with the fetched data
      this.cardList = data; // Assuming the response data is suitable for `cardList`
    });
  }
  getWaveHeight(percentage: number): string {
    return percentage > 100 ? '100' : percentage.toString();
  }
  getAlertClass(card: any): string {
    if (card.alertStatus.includes('Low')) {
      return 'low-alert';
    } else if (card.alertStatus.includes('Normal')) {
      return 'normal-alert';
    } else if (card.alertStatus.includes('High')) {
      return 'high-alert';
    }
    return '';
  }
  
  fetchNewContainerData(): void {
    this.dataService.getNewContainerData().subscribe(data => {
      this.dynamicPumpStatusCards = data;
    });
  }

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

  getPumpStatusClass(status: string): string {
    switch (status) {
      case 'Online':
        return 'online';
      case 'Offline':
        return 'offline';
      case 'Disconnected':
        return 'disconnected';
      default:
        return '';
    }
  }

  getCardBackgroundColor(printerStatus: string): string {
    switch (printerStatus) {
      case 'Idle':
        return 'card-light-green';
      case 'Busy':
        return 'card-light-red';
      case 'Error':
        return 'card-light-orange';
      default:
        return '';
    }
  }

  getGridClass(details: Detail[]): string {
    return details.length > 2 ? 'details-grid' : 'details-grid single-column';
  }
}
