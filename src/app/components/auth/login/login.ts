import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthState } from '../../../auth-state';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  email = '';
  password = '';
  rememberMe = true;
  showPassword = false;
  submitted = false;
  errorMessage = '';

  constructor(private readonly router: Router, private readonly auth: AuthState) {}

  signIn(): void {
    this.submitted = true;
    this.errorMessage = '';
    if (!this.email || !this.password) return;

    const error = this.auth.login(this.email, this.password);
    if (error) { this.errorMessage = error; return; }
    this.router.navigateByUrl(this.auth.isAdmin() ? '/admin/orders' : '/');
  }
}
