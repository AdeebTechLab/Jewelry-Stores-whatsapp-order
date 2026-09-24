import { Injectable, computed, signal } from '@angular/core';

export interface AppUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

@Injectable({ providedIn: 'root' })
export class AuthState {
  readonly adminEmail = 'danishandco.admin@gmail.com';
  readonly users = signal<AppUser[]>(this.readUsers());
  readonly currentUser = signal<AppUser | null>(this.readSession());
  readonly isLoggedIn = computed(() => this.currentUser() !== null);
  readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');

  register(name: string, email: string, password: string): string | null {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail.endsWith('@gmail.com')) return 'Please use a Gmail address.';
    if (this.users().some((user) => user.email === normalizedEmail)) return 'An account with this Gmail already exists.';
    const user: AppUser = { name: name.trim(), email: normalizedEmail, password, role: 'user' };
    this.users.update((users) => { const nextUsers = [...users, user]; this.saveUsers(nextUsers); return nextUsers; });
    this.saveSession(user);
    return null;
  }

  login(email: string, password: string): string | null {
    const normalizedEmail = email.trim().toLowerCase();
    const user = this.users().find((item) => item.email === normalizedEmail && item.password === password);
    if (!user) return 'We could not find an account with those details.';
    this.saveSession(user);
    return null;
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('danish-co-session');
  }

  private saveSession(user: AppUser): void {
    this.currentUser.set(user);
    localStorage.setItem('danish-co-session', JSON.stringify(user));
  }

  private saveUsers(users: AppUser[]): void { localStorage.setItem('danish-co-users', JSON.stringify(users)); }

  private readUsers(): AppUser[] {
    const saved = localStorage.getItem('danish-co-users');
    if (saved) {
      try { return JSON.parse(saved) as AppUser[]; } catch { /* use the default admin */ }
    }
    const admin: AppUser = { name: 'Danish&Co Admin', email: this.adminEmail, password: 'admin123', role: 'admin' };
    this.saveUsers([admin]);
    return [admin];
  }

  private readSession(): AppUser | null {
    const saved = localStorage.getItem('danish-co-session');
    if (!saved) return null;
    try { return JSON.parse(saved) as AppUser; } catch { return null; }
  }
}
