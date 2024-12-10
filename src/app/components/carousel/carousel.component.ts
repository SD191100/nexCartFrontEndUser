import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carousel',
  imports: [FormsModule, CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
//export class CarouselComponent {
//  currentIndex: number = 0;
//
//  images: string[] = [
//    'https://github.com/SD191100/images/blob/main/todo-app-image.png',
//    'https://raw.githubusercontent.com/SD191100/images/refs/heads/main/todo-app-image.png',
//    'https://wowslider.com/sliders/demo-77/data1/images/idaho239691_1920.jpg',
//    'https://wowslider.com/sliders/demo-77/data1/images/idaho239691_1920.jpg',
//    'https://wowslider.com/sliders/demo-77/data1/images/idaho239691_1920.jpg',
//    'https://wowslider.com/sliders/demo-77/data1/images/idaho239691_1920.jpg',
//  ];
//
//  nextSlide(): void {
//    this.currentIndex = (this.currentIndex + 1) % this.images.length;
//  }
//
//  previousSlide(): void {
//    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
//  }
//
//
//}
//export class CarouselComponent implements OnInit {
//  slideImages = [
//    'https://github.com/SD191100/images/blob/main/todo-app-image.png',
//    'https://raw.githubusercontent.com/SD191100/images/refs/heads/main/todo-app-image.png',
//    'https://wowslider.com/sliders/demo-77/data1/images/idaho239691_1920.jpg',
//    'https://wowslider.com/sliders/demo-77/data1/images/idaho239691_1920.jpg',
//    'https://wowslider.com/sliders/demo-77/data1/images/idaho239691_1920.jpg',
//    'https://wowslider.com/sliders/demo-77/data1/images/idaho239691_1920.jpg',
//  ];
//  @ViewChild('sliderRef', { static: true })
//  sliderRef!: ElementRef<HTMLDivElement>;
//
//  selectedSlide = 0;
//
//  constructor() { }
//
//  ngOnInit(): void { }
//
//  selectSlide(index: number): void {
//    this.selectedSlide = index;
//    const width = this.sliderRef.nativeElement.clientWidth;
//    this.sliderRef.nativeElement.scrollLeft = index * width;
//  }
//
//  onPrev(): void {
//    const width = this.sliderRef.nativeElement.clientWidth;
//    this.sliderRef.nativeElement.scrollLeft -= width;
//    this.selectedSlide = Math.max(0, this.selectedSlide);
//  }
//
//  onNext(): void {
//    const width = this.sliderRef.nativeElement.clientWidth;
//    this.sliderRef.nativeElement.scrollLeft += width;
//    this.selectedSlide = Math.min(
//      this.slideImages.length - 1,
//      this.selectedSlide + 1,
//    );
//  }
//}
//
export class CarouselComponent {
  @Input() slideImages: string[] = []; // Array of images passed as input
  @ViewChild('carouselWrapper') carouselWrapper!: ElementRef<HTMLDivElement>;
  currentSlideIndex: number = 0;

  constructor() {}

  // Navigate to the previous slide
  onPrev(): void {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
    } else {
      this.currentSlideIndex = this.slideImages.length - 1; // Loop to the last slide
    }
    this.updateCarousel();
  }

  // Navigate to the next slide
  onNext(): void {
    if (this.currentSlideIndex < this.slideImages.length - 1) {
      this.currentSlideIndex++;
    } else {
      this.currentSlideIndex = 0; // Loop to the first slide
    }
    this.updateCarousel();
  }

  // Update carousel display based on the current slide
  updateCarousel(): void {
    const items = this.carouselWrapper.nativeElement.children;
    for (let i = 0; i < items.length; i++) {
      const item = items[i] as HTMLElement;
      if (i === this.currentSlideIndex) {
        item.classList.remove('hidden');
        item.setAttribute('data-carousel-item', 'active');
      } else {
        item.classList.add('hidden');
        item.removeAttribute('data-carousel-item');
      }
    }
  }
}
