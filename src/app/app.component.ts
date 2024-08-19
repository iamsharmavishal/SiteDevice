import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DeviceGridComponent } from './components/device-grid/device-grid.component';
import { DeviceGridExpandedComponent } from "./components/device-grid-expanded/device-grid-expanded.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    DeviceGridComponent,
    DeviceGridExpandedComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
