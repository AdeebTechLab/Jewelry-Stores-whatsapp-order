import { Routes } from '@angular/router';
import { adminGuard, authGuard } from './auth.guard';

export const routes: Routes = [
	{ path: '', loadComponent: () => import('./components/home/home').then((module) => module.Home) },
	{ path: 'product/:name', loadComponent: () => import('./components/pro-details/pro-details').then((module) => module.ProDetails) },
	{ path: 'products', loadComponent: () => import('./components/all-products/all-products').then((module) => module.AllProducts) },
	{ path: 'cart', canActivate: [authGuard], loadComponent: () => import('./components/cart/cart').then((module) => module.Cart) },
	{ path: 'wishlist', canActivate: [authGuard], loadComponent: () => import('./components/wishlist/wishlist').then((module) => module.Wishlist) },
	{ path: 'checkout', canActivate: [authGuard], loadComponent: () => import('./components/checkout/checkout').then((module) => module.Checkout) },
	{ path: 'orders', canActivate: [authGuard], loadComponent: () => import('./components/admin/orders/orders').then((module) => module.Orders) },
	{ path: 'admin/orders', canActivate: [adminGuard], loadComponent: () => import('./components/admin/orders/orders').then((module) => module.Orders) },
	{ path: 'admin/products', canActivate: [adminGuard], loadComponent: () => import('./components/admin/products/products').then((module) => module.Products) },
	{ path: 'admin/products/add', canActivate: [adminGuard], loadComponent: () => import('./components/admin/add-pro/add-pro').then((module) => module.AddPro) },
	{ path: 'admin/products/edit/:name', canActivate: [adminGuard], loadComponent: () => import('./components/admin/edit-pro/edit-pro').then((module) => module.EditPro) },
	{ path: 'admin/settings', canActivate: [adminGuard], loadComponent: () => import('./components/admin/settings/settings').then((module) => module.Settings) },
	{ path: 'login', loadComponent: () => import('./components/auth/login/login').then((module) => module.Login) },
	{ path: 'signup', loadComponent: () => import('./components/auth/signup/signup').then((module) => module.Signup) },
	{ path: 'forgot-password', loadComponent: () => import('./components/auth/forgot-password/forgot-password').then((module) => module.ForgotPassword) },
	{ path: 'reset-password', loadComponent: () => import('./components/auth/reset-password/reset-password').then((module) => module.ResetPassword) },
	{ path: '**', redirectTo: 'login' },
];
