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
  type: string; // Added type field
  alertStatus: string;
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
  selectedDate = this.dateOptions[0].value;
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
        title: 'Tank 1',
        type: 'Unleaded', // Added type
        alertStatus: '0',
        fillPercentage: 30,
        capacity: 200,
        volume: 2000
      },
      {
        title: 'Tank 2',
        type: 'Diesel', // Added type
        alertStatus: '1',
        fillPercentage: 60,
        capacity: 300,
        volume: 2500
      },
      {
        title: 'Tank 3',
        type: 'Premium', // Added type
        alertStatus: '0',
        fillPercentage: 90,
        capacity: 400,
        volume: 3000
      },
      {
        title: 'Tank 4',
        type: 'Premium', // Added type
        alertStatus: '0',
        fillPercentage: 30,
        capacity: 400,
        volume: 3000
      },
    {
      title: 'Tank 5',
      type: 'Premium', // Added type
      alertStatus: '0',
      fillPercentage: 95,
      capacity: 400,
      volume: 3000
    }
    ];
  }

  fetchExistingData(): void {
    this.dataService.getExistingData().subscribe(data => {
      console.log('Existing Data:', data);
      this.cardList = data; // Assuming the response data is suitable for `cardList`
    });
  }

  fetchNewContainerData(): void {
    this.dataService.getNewContainerData().subscribe(data => {
      this.dynamicPumpStatusCards = data;
    });
  }

  getStatusColor(alertStatus: string): string {
    const alertLevel = parseInt(alertStatus, 10); // Convert the alertStatus to an integer
  
    if (isNaN(alertLevel)) {
      return '#ffffff'; // Default color if alertStatus is not a number
    }
  
    if (alertLevel > 5) {
      return '#ff4d4d'; // Red for alert levels greater than 5
    } else if (alertLevel > 0) {
      return '#ffcc00'; // Yellow for alert levels between 1 and 5
    } else if (alertLevel === 0) {
      return '#00cc44'; // Green for alert level of 0 (no alert)
    }
  
    return '#ffffff'; // Default color if none of the conditions match
  }

  getAlertClass(card: TankCard): string {
    const alertLevel = parseInt(card.alertStatus, 10); // Convert the alertStatus to an integer
  
    if (isNaN(alertLevel)) {
      return ''; // Return an empty string if alertStatus is not a number
    }
  
    if (alertLevel > 5) {
      return 'high-alert'; // Class for high alert
    } else if (alertLevel > 0) {
      return 'normal-alert'; // Class for normal alert
    } else if (alertLevel === 0) {
      return 'low-alert'; // Class for low alert
    }
  
    return ''; // Default return if none of the conditions match
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
  getWaveColor(percentage: number): string {
    if (percentage >= 95) {
      return '#4cc3ff'; // Dark blue when almost full
    } else if (percentage >= 70) {
      return '#4CAF50'; // Green for high fill
    } else if (percentage >= 50) {
      return '#ff6a00'; // Orange for moderate fill
    } else if (percentage >= 10) {
      return '#ffcb33'; // Yellow for low fill
    } else {
      return '#F44336'; // Red for very low fill
    }
  }
  
  getWaveHeight(percentage: number): string {
    return percentage > 100 ? '100%' : `${percentage}%`;
  }
  
  getWaveScale(percentage: number): string {
    if (percentage >= 95) {
      return '1'; // No wave when almost full
    } else if (percentage < 50) {
      return '1.2'; // Small wave for lower fill percentages
    } else {
      return '1'; // Normal size for moderate and high fill percentages
    }
  }
  
}
