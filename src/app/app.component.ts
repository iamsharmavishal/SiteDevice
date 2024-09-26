import { Component, HostListener, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';  // Import isPlatformBrowser and PLATFORM_ID

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isNavbarOpen = false;
  isMobileView = false;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);  // Check if platform is browser

    if (this.isBrowser) {
      this.updateView();  // Only update view if in browser context
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.isBrowser) {
      this.updateView();  // Only call updateView if in browser context
    }
  }

  updateView() {
    this.isMobileView = window.innerWidth < 768;  // Example breakpoint for mobile/tablet
  }

  toggleSidenav() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  onSidenavToggle(opened: boolean) {
    this.isNavbarOpen = opened;
  }

  closeSidenavOnMobile() {
    if (this.isMobileView) {
      this.isNavbarOpen = false; // Close the sidenav on mobile when an item is clicked
    }
  }
}
