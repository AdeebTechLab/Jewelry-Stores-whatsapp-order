import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthState } from '../../../auth-state';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-signup',
  styleUrl: './signup.css',
  templateUrl: './signup.html',
})
export class Signup {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  submitted = false;
  errorMessage = '';
  constructor(private readonly auth: AuthState, private readonly router: Router) {}
  register(): void {
    this.submitted = true;
    this.errorMessage = '';
    if (!this.name || !this.email || !this.password || !this.confirmPassword || this.password !== this.confirmPassword) return;
    const error = this.auth.register(this.name, this.email, this.password);
    if (error) { this.errorMessage = error; return; }
    this.router.navigateByUrl('/');
  }
}
