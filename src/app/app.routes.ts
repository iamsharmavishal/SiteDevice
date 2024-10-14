import { Routes } from '@angular/router';
import { SiteDetailComponent } from './components/site-detail/site-detail.component';
import { DeviceGridComponent } from './components/device-grid/device-grid.component';
import { DeviceGridExpandedComponent } from './components/device-grid-expanded/device-grid-expanded.component';
import { AlarmListComponent } from './components/alarm-list/alarm-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/site-detail', pathMatch: 'full' },
  { path: 'site-detail', component: SiteDetailComponent },
  { path: 'device-grid', component: DeviceGridComponent },
  { path: 'alerts', component: AlarmListComponent },
  { path: 'device-grid-expanded', component: DeviceGridExpandedComponent }
];
