import { Component } from '@angular/core';
import { HeroSection } from '../hero-section/hero-section';
import { CategorySection } from '../category-section/category-section';
import { FeaturedProducts } from '../featured-products/featured-products';
import { PromoBanner } from '../promo-banner/promo-banner';
import { Footer } from '../footer/footer';
import { NewArrivals } from '../new-arrivals/new-arrivals';
import { WhyChooseUs } from '../why-choose-us/why-choose-us';
import { Testimonials } from '../testimonials/testimonials';
import { Newsletter } from '../newsletter/newsletter';

@Component({
  imports: [HeroSection, CategorySection, NewArrivals, FeaturedProducts, WhyChooseUs, Testimonials, PromoBanner, Newsletter, Footer],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}
