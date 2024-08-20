import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../env/environment';

export interface Detail {
  key: string;
  value: string;
}

export interface Transaction {
  label: string;
  value: number;
}

export interface PriceStatus {
  name: string;
  pole: string;
  price: number;
}

export interface DynamicCard {
  title: string;
  printerStatus: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = `${environment.apiUrl}/data`;

  // Dummy data
  private cardList = [
    {
      title: 'Site Controller',
      lastUpdated: '3 minutes ago',
      dynamicText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing eliLorem ipsum dolor sit amet, consectetur adipiscing eli',
      details: [
        { key: 'VM Status', value: 'Online' },
        { key: 'Host Status', value: 'Connected' }
      ]
    },
    {
      title: 'EPC',
      lastUpdated: '4 minutes ago',
      dynamicText: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
      dynamicText: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      details: [
        { key: 'VM Status', value: 'Online' },
        { key: 'Host Status', value: 'Connected' }
      ]
    },
    {
      title: 'Pump Controller',
      lastUpdated: '4 minutes ago',
      dynamicText: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      details: [
        { key: 'VM Status', value: 'Online' },
        { key: 'Host Status', value: 'Connected' }
      ]
    }
  ];

  dynamicPumpStatusCards: DynamicCard[] = [
    {
      title: 'Gilbarco - FPI',
      printerStatus: 'Idle',
      status: 'Online'
    },
    {
      title: 'Gilbarco - FPI 2',
      printerStatus: 'Busy',
      status: 'Offline'
    },
    {
      title: 'Gilbarco - FPI 3',
      printerStatus: 'Idle',
      status: 'Disconnected'
    },
    {
      title: 'Gilbarco - FPI 4',
      printerStatus: 'Busy',
      status: 'Online'
    },
    {
      title: 'Gilbarco - FPI 5',
      printerStatus: 'Idle',
      status: 'Offline'
    }
  // Add more cards as needed
];

  constructor(private http: HttpClient) { }

  // Uncomment the following code to use the API
  /*
  getExistingData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/existing-data`).pipe(
      catchError(this.handleError('getExistingData', {}))
    );
  }
  */

  getExistingData(): Observable<any> {
    // Return dummy data instead of making an HTTP call
    return of(this.cardList).pipe(
      catchError(this.handleError('getExistingData', []))
    );
  }

  // Uncomment the following code to use the API
  /*
  getNewContainerData(): Observable<DynamicCard[]> {
    return this.http.get<DynamicCard[]>(`${this.apiUrl}/dynamic-cards`).pipe(
      catchError(this.handleError('getNewContainerData', []))
    );
  }
  */

  getNewContainerData(): Observable<DynamicCard[]> {
    // Return an empty array of DynamicCard for dummy data
    return of(this.dynamicPumpStatusCards).pipe(
      catchError(this.handleError('getNewContainerData', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
