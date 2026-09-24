import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StorefrontState } from '../../../storefront-state';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-settings',
  styleUrl: './settings.css',
  templateUrl: './settings.html',
})
export class Settings {
  whatsapp = '';
  saved = false;

  constructor(protected readonly store: StorefrontState) {
    this.whatsapp = this.store.adminWhatsApp();
  }

  save(): void {
    this.store.saveAdminWhatsApp(this.whatsapp);
    this.whatsapp = this.store.adminWhatsApp();
    this.saved = true;
  }
}