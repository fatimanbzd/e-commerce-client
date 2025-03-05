import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  NgClass,
  NgForOf,
  NgIf,
  NgOptimizedImage,
  NgStyle,
} from '@angular/common';
import { FullSrcPipe } from '@core/pipes/full-src.pipe';

@Component({
    selector: 'app-product-image',
    imports: [NgForOf, FullSrcPipe, NgStyle, NgIf, NgClass, NgOptimizedImage],
    templateUrl: './product-image.component.html',
    styleUrl: './product-image.component.scss'
})
export class ProductImageComponent implements OnChanges {
  @Input() images?: { imageSrc: string; isMainImage: boolean }[];
  currentIndex: number = 0;
  showZoomIcon: boolean = false;
  isLightboxOpen: boolean = false;

  get currentImage(): string {
    return this.images ? this.images[this.currentIndex].imageSrc : '';
  }

  get isFirstImage(): boolean {
    return this.currentIndex === 0;
  }

  get isLastImage(): any {
    return this.images && this.currentIndex === this.images.length - 1;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['images'] && this.images) {
      this.images = this.images.sort((a, b) => (b.isMainImage ? 1 : -1));
      this.currentIndex = this.images.findIndex((x) => x.isMainImage);
    }
  }

  nextImage(): void {
    if (this.images && this.images.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }
  }

  previousImage(): void {
    if (this.images && this.images.length > 0) {
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
    }
  }

  setImage(index: number): void {
    if (this.images && index >= 0 && index < this.images.length) {
      this.currentIndex = index;
    }
  }

  openLightbox(): void {
    this.isLightboxOpen = true;
  }

  closeLightbox(): void {
    this.isLightboxOpen = false;
  }

  nextImageInLightbox(): void {
    if (this.images && this.images.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }
  }

  previousImageInLightbox(): void {
    if (this.images && this.images.length > 0) {
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
    }
  }

  setImageInLightbox(index: number): void {
    if (this.images && index >= 0 && index < this.images.length) {
      this.currentIndex = index;
    }
  }
}
