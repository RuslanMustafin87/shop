/* eslint-disable no-inner-declarations */
export default function(options) {

	const slider = document.querySelector('.my-slider');
	const containerSlides = document.getElementById('container-slides');

	const buttonRight = document.createElement('button');
	const buttonLeft = document.createElement('button');

	buttonRight.classList.add('my-slider__button', 'my-slider__button--right');
	buttonRight.id = 'button-right';
	buttonLeft.classList.add('my-slider__button', 'my-slider__button--left');
	buttonLeft.id = 'button-left';
	slider.append(buttonRight, buttonLeft);

	if (!options.infinite) {
		buttonLeft.hidden = true;
	} // скрываем левую кнопку при небесконечном слайдере

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
			if (Math.abs(containerSlides.offsetLeft) + 1 < childrenList[i].offsetLeft + childrenList[i].offsetWidth) {
				return i;
			}
		}
	}

	// событие нажатия на правую кнопку и перемещение слайдера вправо
	buttonRight.addEventListener('click', function() {
		if (!isMove) {
			isMove = true;
		} else {
			return;
		}

		setTimeout(function() {
			isMove = false;
		}, options.animateTime * 1000);

		let indexElemAtEdge = findElemAtEdge(containerSlides);
		let containerLeft = indexElemAtEdge + 1;

		if (!options.infinite && containerLeft < maxScroll) {
			containerLeft = maxScroll;
		}
		containerSlides.style.left = `-${containerLeft}00%`;
	});

	// событие нажатия на левую кнопку и перемещение слайдера влево
	buttonLeft.addEventListener('click', function() {
		if (!isMove) {
			isMove = true;
		} else {
			return;
		}

		setTimeout(function() {
			isMove = false;
		}, options.animateTime * 1000);

		let indexElemAtEdge = findElemAtEdge(containerSlides);
		let containerLeft = indexElemAtEdge - 1;
		containerSlides.style.left = `-${containerLeft}00%`;
	});

	// событие слежения за окончанием перемещения слайдера
	if (!options.infinite) {
		// функция появление и скрытия кнопок для перемещения слайдера
		function toggleButtons() {
			let containerLeft = containerSlides.offsetLeft;

			buttonRight.hidden = false;
			buttonLeft.hidden = false;
			if (containerLeft === maxScroll) {
				buttonRight.hidden = true;
			}
			if (containerLeft === 0) {
				buttonLeft.hidden = true;
			}
		}

		containerSlides.addEventListener('transitionend', function() {
			console.log('jijk');
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