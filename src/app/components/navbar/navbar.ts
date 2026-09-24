import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StorefrontState } from '../../storefront-state';
import { AuthState } from '../../auth-state';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule, RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  constructor(protected readonly store: StorefrontState, protected readonly auth: AuthState, private readonly router: Router) {}
  logout(): void { this.auth.logout(); this.router.navigateByUrl('/'); }
}
