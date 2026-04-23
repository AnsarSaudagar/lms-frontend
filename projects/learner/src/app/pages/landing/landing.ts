import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class LandingComponent {
  projects = [
    { title: 'Build a Portfolio Site',    tags: ['HTML','CSS','JS'],           diff: 'Beginner',     color: 'oklch(0.68 0.17 230)', pro: false },
    { title: 'Task Manager App',          tags: ['React','Context API'],        diff: 'Intermediate', color: 'oklch(0.65 0.17 190)', pro: true  },
    { title: 'Web Scraper CLI',           tags: ['Python','BeautifulSoup'],     diff: 'Beginner',     color: 'oklch(0.72 0.17 80)',  pro: false },
    { title: 'REST API with Auth',        tags: ['Node.js','PostgreSQL'],       diff: 'Intermediate', color: 'oklch(0.75 0.17 145)', pro: true  },
    { title: 'Real-Time Chat App',        tags: ['React','Socket.io'],          diff: 'Advanced',     color: 'oklch(0.65 0.17 310)', pro: true  },
    { title: 'ML Image Classifier',       tags: ['Python','PyTorch'],           diff: 'Intermediate', color: 'oklch(0.68 0.17 30)',  pro: true  },
    { title: 'E-Commerce Storefront',     tags: ['React','Stripe'],             diff: 'Advanced',     color: 'oklch(0.65 0.17 265)', pro: true  },
    { title: 'CSS Animation Gallery',     tags: ['HTML','CSS'],                 diff: 'Beginner',     color: 'oklch(0.70 0.17 350)', pro: false },
  ];

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
