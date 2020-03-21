import { Component, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.page.html',
  styleUrls: ['./tour.page.scss'],
})
export class TourPage implements OnInit {
  slideOptions = {
    initialSlide: 1,
    speed: 400,
  };
  constructor() { }
  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }
  ngOnInit() {
  }

}
