import { Component, OnDestroy, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-hero-section',
  styleUrl: './hero-section.css',
  templateUrl: './hero-section.html',
})
export class HeroSection implements OnDestroy {
  readonly slides = [
    { image: '/assets/images/heroimage.png', alt: 'Bride wearing traditional gold jewellery' },
    { image: '/assets/images/image-2.png', alt: 'Bridal jewellery collection' },
    { image: '/assets/images/image-3.png', alt: 'Elegant gold jewellery styling' },
  ];
  readonly activeSlide = signal(0);
  private readonly timer = window.setInterval(() => this.activeSlide.update((index) => (index + 1) % this.slides.length), 6000);
  previousSlide(): void { this.activeSlide.update((index) => (index - 1 + this.slides.length) % this.slides.length); }
  nextSlide(): void { this.activeSlide.update((index) => (index + 1) % this.slides.length); }
  ngOnDestroy(): void { window.clearInterval(this.timer); }
}
