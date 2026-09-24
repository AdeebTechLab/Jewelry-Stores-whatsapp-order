import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StorefrontState } from '../../../storefront-state';
import { AuthState } from '../../../auth-state';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-orders',
  styleUrl: './orders.css',
  templateUrl: './orders.html',
})
export class Orders {
  cancellationReasons: Record<string, string> = {};
  cancellingOrderId: string | null = null;
  cancellationReason = '';
  constructor(protected readonly store: StorefrontState, protected readonly auth: AuthState) {}
  onStatusChange(id: string, event: Event): void {
    const status = (event.target as HTMLSelectElement).value;
    if (status === 'Cancelled') {
      const order = this.store.orders().find((item) => item.id === id);
      this.cancellingOrderId = id;
      this.cancellationReason = order?.cancellationReason ?? '';
      return;
    }
    this.store.updateOrderStatus(id, status);
  }
  confirmCancellation(): void {
    if (!this.cancellingOrderId || !this.cancellationReason.trim()) return;
    this.store.updateOrderStatus(this.cancellingOrderId, 'Cancelled', this.cancellationReason.trim());
    this.cancellationReasons[this.cancellingOrderId] = this.cancellationReason.trim();
    this.store.notify('Order cancelled with reason saved', 'warning');
    this.closeCancellation();
  }
  closeCancellation(): void {
    this.cancellingOrderId = null;
    this.cancellationReason = '';
  }
  saveReason(id: string): void { this.store.updateCancellationReason(id, this.cancellationReasons[id] ?? ''); }
  deleteOrder(id: string): void {
    if (!this.auth.isAdmin() || !confirm(`Delete order ${id}? This cannot be undone.`)) return;
    this.store.deleteOrder(id);
  }
}
