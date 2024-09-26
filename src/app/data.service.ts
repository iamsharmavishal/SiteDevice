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
  id :number;
  name: string;
  pump: number;
  pole: number;
 
}

export interface DynamicCard {
  id :number;
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

  constructor(private http: HttpClient) { }

  // Uncomment the following code to use the API

  getPriceListData(): Observable<PriceStatus[]> {
    return this.http.get<PriceStatus[]>(`${this.apiUrl}/priceList`).pipe(
      catchError(this.handleError('getPriceListData', []))
    );
  }
 

  getCardData(): Observable<any> {
    // Return dummy data instead of making an HTTP call
    return this.http.get<any>(`${this.apiUrl}/siteList`).pipe(
      catchError(this.handleError('getCardData', {}))
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

  getPumpStatusData(): Observable<DynamicCard[]> {
    // Return an empty array of DynamicCard for dummy data
    return this.http.get<DynamicCard[]>(`${this.apiUrl}/pumpStatusList`).pipe(
      catchError(this.handleError('getPumpStatusData', []))
    );
  }

  getTankData(): Observable<any> {
    // Return an empty array of DynamicCard for dummy data
    return this.http.get<any[]>(`${this.apiUrl}/tankData`).pipe(
      catchError(this.handleError('getTankDataData', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
