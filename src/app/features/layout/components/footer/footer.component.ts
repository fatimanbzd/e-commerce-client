import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-footer',
    imports: [NgIf, RouterLink],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnDestroy, OnInit, OnDestroy {
  isVisible: boolean = false;
  scrollListener: (() => void) | undefined;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.scrollListener = this.renderer.listen('window', 'scroll', () => {
      this.isVisible = window.scrollY > 200;
    });
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      this.scrollListener();
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
