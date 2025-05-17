import {AfterViewInit, Component, Inject, OnDestroy, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, NgForOf} from "@angular/common";


interface ICarouselImage {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-carousel',
  imports: [
    NgForOf
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})

export class CarouselComponent implements AfterViewInit, OnDestroy{
  activeImageIndex = 0;
  images: ICarouselImage[] = [
    {
      src: 'assets/images/slide-1.jpg',
      alt: 'Carousel1'
    },
    {
      src: 'assets/images/slide-2.jpg',
      alt: 'Carousel2'
    },
    {
      src: 'assets/images/slide-3.jpg',
      alt: 'Carousel3'
    },
    {
      src: 'assets/images/slide-4.jpg',
      alt: 'Carousel4'
    }
  ];
  intervalId: any;

  constructor(@Inject(PLATFORM_ID) private platformId: object){
  }

  onPrevious() {
    this.activeImageIndex =
      (this.activeImageIndex - 1 + this.images.length) % this.images.length;
  }

  onNext() {
    this.activeImageIndex = (this.activeImageIndex + 1) % this.images.length;
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.startCarouselTimer();
    } else {
      this.activeImageIndex = 0;
    }

  }


  startCarouselTimer() {
    setInterval(() => {
      this.onNext()
    }, 3000);
  }

  ngOnDestroy() {
    clearInterval(this.activeImageIndex);
  }
}
