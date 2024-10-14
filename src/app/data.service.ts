import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../env/environment';

// Define your data models
export interface Detail {
  key: string;
  value: string;
}

export interface Transaction {
  label: string;
  value: number;
}

export interface PriceStatus {
  id: number;
  name: string;
  pump: number;
  pole: number;
}

export interface DynamicCard {
  id: number;
  title: string;
  printerStatus: string;
  status: string;
}

export interface TankCard {
  svgContent: any;
  title: string;
  type: string; // Type of fuel in the tank
  alertStatus: string; // The alert status (0, 1, etc.)
  fillPercentage: number; // Oil fill percentage
  waterFillPercentage: number; // Water fill percentage
  capacity: number; // Capacity of the tank
  volume: number; // Combined oil and water volume
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = `${environment.apiUrl}api`;

  constructor(private http: HttpClient) {}

  // Fetch price list data
  getPriceListData(): Observable<PriceStatus[]> {
    return this.http.get<PriceStatus[]>(`${this.apiUrl}/priceList`).pipe(
      catchError(this.handleError('getPriceListData', []))
    );
  }

  // Fetch card data
  getCardData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/siteList`).pipe(
      catchError(this.handleError('getCardData', {}))
    );
  }

  // Fetch dynamic card data (for new containers)
  getNewContainerData(): Observable<DynamicCard[]> {
    return this.http.get<DynamicCard[]>(`${this.apiUrl}/dynamic-cards`).pipe(
      catchError(this.handleError('getNewContainerData', []))
    );
  }

  // Fetch pump status data
  getPumpStatusData(): Observable<DynamicCard[]> {
    return this.http.get<DynamicCard[]>(`${this.apiUrl}/pumpStatusList`).pipe(
      catchError(this.handleError('getPumpStatusData', []))
    );
  }

  // Fetch tank data
  getTankData(): Observable<TankCard[]> {
    return this.http.get<TankCard[]>(`${this.apiUrl}/tankData`).pipe(
      catchError(this.handleError('getTankData', []))
    );
  }

  // Fetch list of submitted alerts
  getSubmittedAlerts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/submittedAlerts`).pipe(
      catchError(this.handleError('getSubmittedAlerts', []))
    );
  }

  // Submit alert data
  submitAlert(alertData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/submitAlert`, alertData).pipe(
      catchError(this.handleError('submitAlert', {}))
    );
  }

  // Error handling logic
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
