import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {
  DataService,
  DynamicCard,
  Detail,
  Transaction,
  PriceStatus,
  TankCard,
} from '../../data.service';
import { SocketService } from '../../socket.service';

@Component({
  selector: 'app-site-detail',
  standalone: true,
  imports: [
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    CommonModule,
    MatTableModule,
    MatIconButton,
  ],
  templateUrl: './site-detail.component.html',
  styleUrls: ['./site-detail.component.scss'],
})
export class SiteDetailComponent implements OnInit {
  siteInfo = {
    number: '4352',
    details: '123 Radiant VTX 7749',
  };
  svgContent: string | null = null;
  dateOptions = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last 7 Days', value: 'last7days' },
  ];

  outdoorTransaction: Transaction = {
    label: 'Outdoor Transaction',
    value: 2000,
  };
  selectedDate = this.dateOptions[0].value;
  indoorTransaction: Transaction = {
    label: 'Indoor Transaction',
    value: 1500,
  };

  displayedColumns: string[] = ['name', 'pole', 'price'];

  cardList: any[] = [];
  tankCards: TankCard[] = [];
  dynamicPumpStatusCards: DynamicCard[] = [];
  priceStatusData: PriceStatus[] = [];

  constructor(
    private dataService: DataService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.fetchCardData();
    this.fetchPumstatusList();
    this.fetchTankDataList();
    this.fetchPriceList();

    // Subscribe to tank data from the Socket.IO server
    this.socketService.listenForTankData().subscribe((data: any[]) => {
       this.tankCards = data;
      console.log('Real-time tank data:', this.tankCards);
    });
  }

  fetchCardData(): void {
    this.dataService.getCardData().subscribe((data) => {
      console.log('Card Data:', data);
      this.cardList = data; // Assuming the response data is suitable for `cardList`
    });
  }

  fetchPumstatusList(): void {
    this.dataService.getPumpStatusData().subscribe((data) => {
      this.dynamicPumpStatusCards = data;
    });
  }
  fetchPriceList(): void {
    this.dataService.getPriceListData().subscribe((data) => {
      this.priceStatusData = data;
    });
  }

  fetchTankDataList(): void {
    this.dataService.getTankData().subscribe((data: any[]) => {
      // Assuming the backend is returning a compatible structure

      this.tankCards = data.map((tank, index) => ({
        ...tank,
        fillPercentage: tank.fillPercentage || 0,
        waterFillPercentage: tank.waterFillPercentage || 0,
        volume: tank.volume || 0,
      }));
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
    switch (value.toLowerCase()) {
      case 'active':
        return 'green';
      case 'stopped':
        return 'red';
      default:
        return 'blue';
    }
  }

  getPumpStatusClass(status: string): string {
    switch (status) {
      case 'Idle':
        return 'idle';
      case 'Offline':
        return 'offline';
      case 'Payment':
        return 'payment';
      case 'Fuelling':
        return 'fuelling';
      default:
        return '';
    }
  }

  getCardBackgroundColor(printerStatus: string): string {
    switch (printerStatus) {
      case 'Idle':
        return 'card-light-orange';
      case 'Offline':
        return 'card-light-red';
      case 'Payment':
        return 'card-light-green';
      case 'Fuelling':
        return 'card-light-blue';
      default:
        return '';
    }
  }

  getGridClass(details: Detail[]): string {
    return details.length > 2 ? 'details-grid' : 'details-grid single-column';
  }

  getWaveHeight(percentage: number): string {
    return percentage > 100 ? '100%' : `${percentage}%`;
  }

  getFillColorByType(type: string): string {
    switch (type.toLowerCase()) {
      case 'unleaded':
        return '#FF6A00';
      case 'regular':
        return '#4CC3FF';
      case 'octane 91':
        return '#FFCB33';
      case 'diesel':
        return '#128353';
      case 'petrol':
        return '#9500ff'; // Custom color for petrol
      default:
        return '#e64ab2'; // Default color for unknown types
    }
  }
}
