import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorefrontState } from '../../storefront-state';

@Component({
  imports: [FormsModule],
  selector: 'app-newsletter',
  styleUrl: './newsletter.css',
  templateUrl: './newsletter.html',
})
export class Newsletter {
  email = '';
  subscribed = false;
  constructor(protected readonly store: StorefrontState) {}
  subscribe(): void { this.subscribed = this.email.trim().length > 0; }
}
