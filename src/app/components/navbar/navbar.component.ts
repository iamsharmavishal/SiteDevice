import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
