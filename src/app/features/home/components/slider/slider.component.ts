import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
    selector: 'app-slider',
    imports: [NgForOf],
    templateUrl: './slider.component.html',
    styleUrl: './slider.component.scss'
})
export class SliderComponent implements OnInit {
  pictures: string[] = [
    '../../../../../assets/images/slide-1.jpg',
    '../../../../../assets/images/slide-2.jpg',
    '../../../../../assets/images/slide-3.jpg',
    '../../../../../assets/images/slide-4.jpg',
    '../../../../../assets/images/slide-1.jpg',
    '../../../../../assets/images/slide-2.jpg',
  ];

  index: number = 0;
  auto: any;

  constructor() {}

  ngOnInit() {
    this.AutoPlay();
  }

  Previous() {
    this.index = (this.index - 1 + this.pictures.length) % this.pictures.length;
  }

  next() {
    this.index = (this.index + 1) % this.pictures.length;
  }

  AutoPlay(): void {
    this.auto = setInterval(() => {
      this.next();
    }, 4000);
  }

  goToSlide(index: number) {
    this.index = index;
    clearInterval(this.auto);
    this.AutoPlay();
  }
}
