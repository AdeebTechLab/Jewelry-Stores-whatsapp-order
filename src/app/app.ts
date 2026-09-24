import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { StorefrontState } from './storefront-state';

@Component({
  imports: [RouterOutlet, Navbar],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  constructor(protected readonly store: StorefrontState) {}
}
