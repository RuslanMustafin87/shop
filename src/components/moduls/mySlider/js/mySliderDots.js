export default function(options) {

	const slider = document.querySelector('.my-slider');
	const containerSlides = document.getElementById('container-slides');

	let containerDots = document.createElement('ul');
	containerDots.classList.add('my-slider__dots', 'dots');

	let dot = document.createElement('li');
	dot.classList.add('dots__item');

	let countSlides = options.infinite ? containerSlides.childElementCount - 2 : containerSlides.childElementCount;

	slider.append(containerDots);

	for (let i = 0; i < countSlides; i++) {
		containerDots.append(dot.cloneNode(true));
	}

	let dotsItems = Array.from(containerDots.children);

	dotsItems.forEach((item, index) => {
		item.addEventListener('click', function() {
			let pos = options.infinite ? index + 1 : index;
			containerSlides.style.left = `${pos * -100}%`;
			dotsItems.forEach((item) => {
				item.classList.remove('dots__item--active');
			});
			this.classList.add('dots__item--active');
		});
	});

	containerDots.firstElementChild.classList.add('dots__item--active');

	// функция проверки индекса слайда, который находится на левом краю контейнера
	function findIndexElemAtEdge(containerSlides) {
		let childrenList = Array.from(containerSlides.children);
		for (let i = 0; i < childrenList.length; i++) {
			if (Math.abs(containerSlides.offsetLeft) < childrenList[i].offsetLeft + childrenList[i].offsetWidth) {
				return i;
			}
		}
	}

	// событие переключения внешнего вида дотов на активный дот
	containerSlides.addEventListener('transitionend', function() {
			
		let dotsList = document.querySelectorAll('.dots__item');

		let activeDot = document.querySelector('.dots__item--active');
		activeDot.classList.remove('dots__item--active');

		let newActiveDots = options.infinite ? dotsList[findIndexElemAtEdge(this) - 1] : dotsList[findIndexElemAtEdge(this)];
		newActiveDots.classList.add('dots__item--active');
	});
}