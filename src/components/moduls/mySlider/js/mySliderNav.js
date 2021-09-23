export default function(options) {

	const slider = document.querySelector('.my-slider');
	const containerSlides = document.querySelector('.my-slider__container-slides');

	const buttonRight = document.createElement('button');
	const buttonLeft = document.createElement('button');

	buttonRight.classList.add('my-slider__button', 'my-slider__button--right');
	buttonLeft.classList.add('my-slider__button', 'my-slider__button--left');
	slider.append(buttonRight, buttonLeft);

	if (!options.infinite) {buttonLeft.hidden = true;} // скрываем левую кнопку при небесконечном слайдере

	// вычисляем разницу в ширине между контейнером для слайдов и outer для
	// слежения за тем, когда контейнер достигнет конца
	let maxScroll = containerSlides.offsetParent.clientWidth - containerSlides.clientWidth;

	// переменная веденная для нормального, последовательного переключения слайдов
	// иначе при быстром переключении слайдов контейнер может остановится на половине слайда 
	let isMove = false;

	// функция проверки какой слайд находится на левом краю контейнера
	function findElemAtEdge(containerSlides) {
		let childrenList = Array.from(containerSlides.children);
		for (let i = 0; i < childrenList.length; i++) {
			if (Math.abs(containerSlides.offsetLeft) < childrenList[i].offsetLeft + childrenList[i].offsetWidth) {
				return childrenList[i];
			}
		}
	}

	// событие нажатия на правую кнопку и перемещение слайдера вправо
	buttonRight.addEventListener('click', function() {
		this.dispatchEvent(
			new CustomEvent('push-button-right', {
				bubbles: true,
				detail: {
					name: 'right'
				}
			})
		);
		if (!isMove) {
			isMove = true;
		} else {
			return;
		}

		setTimeout(function() {
			isMove = false;
		}, options.animateTime * 1000);

		let elemAtEdge = findElemAtEdge(containerSlides);
		let containerLeft = elemAtEdge.nextElementSibling.offsetLeft;

		if (!options.infinite && containerLeft < maxScroll) {
			containerLeft = maxScroll;
		}

		containerSlides.style.left = -containerLeft + 'px';
	});

	// событие нажатия на левую кнопку и перемещение слайдера влево
	buttonLeft.addEventListener('click', function() {
		console.time('t2');
		this.dispatchEvent(
			new CustomEvent('push-button-left', {
				bubbles: true,
				detail: {
					name: 'left'
				}
			})
		);
		if (!isMove) {
			isMove = true;
		} else {
			return;
		}

		setTimeout(function() {
			isMove = false;
		}, options.animateTime * 1000);

		let elemAtEdge = findElemAtEdge(containerSlides);
		let containerLeft = elemAtEdge.previousElementSibling.offsetLeft;

		if (!options.infinite) {
			if (containerLeft > 0) {
				containerLeft = '0%';
			}
		}

		containerSlides.style.left = -containerLeft + 'px';
	});

	// функция появление и скрытия кнопок для перемещения слайдера
	function toggleButtons() {
		let containerLeft = containerSlides.offsetLeft;

		buttonRight.hidden = false;
		buttonLeft.hidden = false;
		if (containerLeft === maxScroll) {buttonRight.hidden = true;}
		if (containerLeft === 0) {buttonLeft.hidden = true;}
	}

	// событие слежения за окончанием перемещения слайдера
	if (!options.infinite) {
		containerSlides.addEventListener('transitionend', function() {
			toggleButtons();
		});
	}

}

// не удалять!!!
//// функция переключения дотов направо
//function rightDot() {
//	let activeDot = document.querySelector('.dots__item--active');
//	activeDot.classList.remove('dots__item--active');
//	if (!activeDot.nextElementSibling) {
//		activeDot.parentElement.firstElementChild.classList.add('dots__item--active');
//		return;
//	}
//	activeDot.nextElementSibling.classList.add('dots__item--active');
//}
//
//// функция переключения дотов налево
//function leftDot() {
//	let activeDot = document.querySelector('.dots__item--active');
//	activeDot.classList.remove('dots__item--active');
//	if (!activeDot.previousElementSibling) {
//		activeDot.parentElement.lastElementChild.classList.add('dots__item--active');
//		return;
//	}
//	activeDot.previousElementSibling.classList.add('dots__item--active');
//}