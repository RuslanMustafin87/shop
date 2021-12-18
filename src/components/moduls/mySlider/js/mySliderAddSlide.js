export default function(imgSrc, imgAlt) {

	const slide = document.createElement('li');
	const img = document.createElement('img');

	slide.classList.add('my-slider__slide');
	img.classList.add('my-slider__image');

	img.src = imgSrc;
	img.alt = imgAlt;

	slide.appendChild(img);

	return slide;
}