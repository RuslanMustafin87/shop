export default {
	init(options) {

		const slider = document.getElementById('my-slider');
		const sliderChildren = Array.from(slider.children);

		while (slider.firstElementChild) {
			slider.removeChild(slider.firstChild);
		}

		let outer = document.createElement('div');
		let containerSlides = document.createElement('ul');
		outer.classList.add('my-slider__outer');
		containerSlides.classList.add('my-slider__container-slides');
		containerSlides.id = 'container-slides';
		slider.appendChild(outer);
		outer.appendChild(containerSlides);

		containerSlides.style.transition = `left ${options.animateTime}s linear`;

		sliderChildren.forEach(slide => {
			slide.className = 'my-slider__slide';
			containerSlides.appendChild(slide.cloneNode(true));
		});

		if (options.infinite) {
			const firstSlide = containerSlides.firstElementChild;
			const lastSlide = containerSlides.lastElementChild;

			containerSlides.append(firstSlide.cloneNode(true));
			containerSlides.prepend(lastSlide.cloneNode(true));

			containerSlides.style.left = '-100%';
		}

		const containerChildren = Array.from(containerSlides.children);
		containerSlides.style.width = `${containerSlides.childElementCount}00%`;

		containerChildren.forEach(item => {
			item.style.width = `${100 / containerSlides.childElementCount}%`;
		});

		function findElemAtEdge(containerSlides) {
			let childrenList = Array.from(containerSlides.children);
			for (let i = 0; i < childrenList.length; i++) {
				if (Math.abs(containerSlides.offsetLeft) < childrenList[i].offsetLeft + childrenList[i].offsetWidth) {
					return childrenList[i];
				}
			}
		}

		// переменая чтобы отключать автоплей при нажатие на слайдер
		let timerAutoplay;
		// функция запуска автоплей
		function startAutoplay() {
			timerAutoplay = setInterval(() => {
				let elemAtEdge = findElemAtEdge(containerSlides);
				containerSlides.style.transition = `left ${options.animateTime}s linear`;
				containerSlides.style.left = -elemAtEdge.nextElementSibling.offsetLeft + 'px';
			}, options.autoplayInterval * 1000);
		}

		if (options.autoplay) {
			startAutoplay();

			containerSlides.addEventListener('mousedown', () => {
				clearInterval(timerAutoplay);
			});

			document.addEventListener('mouseup', () => {
				if (event.target.closest('.my-slider__slide')){
					startAutoplay();
				}
			});
		}

		// если слайдер-карусель делаем его бесконечным

		if (options.infinite) {
			containerSlides.addEventListener('transitionend', function() {
				let containerLeft = containerSlides.offsetLeft;
				let maxScroll = containerSlides.offsetParent.clientWidth - containerSlides.clientWidth;

				if (containerLeft === 0) {
					containerSlides.style.transition = 'none';
					containerSlides.style.left = `-${containerSlides.childElementCount - 2}00%`;
					return;
				}
				if (containerLeft <= maxScroll) {
					containerSlides.style.transition = 'none';
					containerSlides.style.left = '-100%';
					return;
				}
			});
		}
	}
};