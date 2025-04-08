import {
  AfterViewInit,
  Component,
  Inject,
  makeStateKey,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  TransferState
} from '@angular/core';
import {animate, animation, style, trigger, useAnimation} from '@angular/animations';
import {Subscription, timer} from 'rxjs';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';

const fadeIn = animation([
  style({opacity: 0}), // start state
  animate('{{time}}', style({opacity: 1}))
]);

const fadeOut = animation([
  animate('{{time}}', style({opacity: 0}))
]);

interface ICarouselImage {
  src: string;
  alt: string;
}

const BROWSER_KEY = makeStateKey<boolean>('isBrowser');

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  // animations: [trigger('carouselAnimation', [
  //   useAnimation(fadeIn, {
  //     params: {
  //       time: 4000
  //     }
  //   }),
  //   useAnimation(fadeOut, {
  //     params: {
  //       time: 4000
  //     }
  //   }),
  // ])]
})
export class SliderComponent implements AfterViewInit, OnDestroy, OnInit {
  private timerSubscription!: Subscription;
  // isBrowser: boolean;
  images: ICarouselImage[] = [
    {
      src: 'assets/images/slide-1.jpg',
      alt: ''
    },
    {
      src: 'assets/images/slide-2.jpg',
      alt: ''
    },
    {
      src: 'assets/images/slide-3.jpg',
      alt: ''
    },
    {
      src: 'assets/images/slide-4.jpg',
      alt: ''
    }
  ];
  activeImageIndex = 0;
  lastIndexPosition!: number;

  constructor(@Inject(PLATFORM_ID) private platformId: object){
    //this.isBrowser = transferState.get(BROWSER_KEY, isPlatformBrowser(this.platformId));
    // console.log('Platform ID:', platformId);
    // console.log('isPlatformBrowser:', this.isBrowser);
    // console.log('isPlatformServer:', isPlatformServer(this.platformId));

  }

  ngOnInit() {

  }

  onPrevious() {
    if (this.activeImageIndex == 0) {
      this.activeImageIndex = this.lastIndexPosition;
    } else {
      this.activeImageIndex -= 1;
    }
  }

  onNext() {
    if (this.activeImageIndex >= this.lastIndexPosition) {
      this.activeImageIndex = 0;
    } else {
      this.activeImageIndex += 1;
    }
  }

  auto: any;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.startCarouselTimer();
    } else {
      this.activeImageIndex = 0;
    }
    // this.lastIndexPosition = this.images.length - 1;
    // if (isPlatformBrowser(this.platformId))
    //   this.timerSubscription = timer(4000, 4000).subscribe(() => {
    //     this.onNext();
    //   });

  }


  startCarouselTimer() {
    setInterval(() => {
      this.onNext()
    }, 3000); // Adjust interval as needed
  }

  ngOnDestroy() {
    this.timerSubscription?.unsubscribe();
  }


}

