// карусель

// import mySliderInitInfinite from './js/mySliderInitInfinite';
import mySliderInit from './js/mySliderInit';
import mySliderNav from './js/mySliderNav';
import mySliderDrop from './js/mySliderDrop';
import mySliderDots from './js/mySliderDots';

export default class MySlider {

	init(options) {

		const {
			autoplay = false,
			autoplayInterval = 3,
			nav = false,
			drop = false,
			dots = false,
			animateTime = 0.5,
			infinite = false
		} = options;

		mySliderInit.init({
			infinite: infinite,
			animateTime: animateTime,
			autoplay: autoplay,
			autoplayInterval: autoplayInterval
		});
		if (nav) {
			mySliderNav({
				infinite: infinite,
				animateTime: animateTime,
			});
		}
		if (drop) {
			mySliderDrop({
				infinite: infinite,
				animateTime: animateTime
			});
		}
		if (dots) {
			mySliderDots({
				infinite: infinite
			});
		}
	}
	addSlide(imgSrc, imgAlt) {
		const slide = document.createElement('li');
		const img = document.createElement('img');

		slide.classList.add('my-slider__slide');
		img.classList.add('my-slider__image');

		img.src = imgSrc;
		img.alt = imgAlt;

		slide.appendChild(img);

		return slide;
	}
}