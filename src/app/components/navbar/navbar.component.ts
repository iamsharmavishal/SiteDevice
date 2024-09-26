import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

interface MenuItem {
  label: string;
  route: string;
  icon?: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() isNavbarOpen = false;
  @Input() isMobileView = false; // Add this line
  @Output() itemClicked = new EventEmitter<void>(); // Event emitter for item click

  
  menuItems: MenuItem[] = [
   // { label: 'Home', route: '/home' },
    { label: 'Site Details', route: '/site-detail', icon: 'home' },
    { label: 'Device Grid', route: '/device-grid', icon: 'info' },
    { label: 'Device Grid Expanded', route: '/device-grid-expanded', icon: 'info' }
  ];

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  onItemClicked() {
    this.itemClicked.emit(); // Emit the event when an item is clicked
  }
}
