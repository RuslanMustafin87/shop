export default function(options) {
	let containerSlides = document.querySelector('.my-slider__container-slides');

	let duration; // направление перемещения слайдера число
	let direction; // направление перемещения слайдера
	// вычисляем разницу в ширине между контейнером для слайдов и outer для
	// слежения за тем, когда контейнер достигнет конца
	let maxScroll = containerSlides.offsetParent.clientWidth - containerSlides.clientWidth;

	// функция перемещения слайдер с помощью дропа
	function moveList(e) {
		let containerLeft = this.offsetLeft;
		this.ondragstart = function() {
			return false;
		};

		if (duration > e.pageX) {
			duration = e.pageX;
			direction = 'right';
			containerLeft -= 8;
		} else if (duration < e.pageX) {
			duration = e.pageX;
			direction = 'left';
			containerLeft += 8;
		}

		if (options.infinite) {
			containerLeft = dropWithInfinite(containerSlides, containerLeft, maxScroll);
		} else {
			containerLeft = dropWithoutInfinite(containerLeft, maxScroll);
		}

		this.style.left = containerLeft + 'px';
	}

	// функция проверки на окончания слайдера-карусель
	function dropWithInfinite(container, containerLeft, maxScroll) {

		if (containerLeft > 0) {
			return maxScroll + container.firstElementChild.offsetWidth;
		}
		if (containerLeft < maxScroll) {
			return -container.firstElementChild.offsetWidth;
		}

		return containerLeft;
	}

	// функция проверки на окончания обычного слайдера
	function dropWithoutInfinite(containerLeft, maxScroll) {

		if (containerLeft > 0) {
			return 0;
		}
		if (containerLeft < maxScroll) {
			return maxScroll;
		}

		return containerLeft;
	}

	// функция проверки какой слайд находится на левом краю контейнера
	function findElemAtEdge(containerSlides) {
		let childrenList = Array.from(containerSlides.children);
		for (let i = 0; i < childrenList.length; i++) {
			if (Math.abs(containerSlides.offsetLeft) < childrenList[i].offsetLeft + childrenList[i].offsetWidth) {
				return childrenList[i];
			}
		}
	}

	// функция перемещения слайдера влево или вправо в зависимоти в какую сторону он перемещен
	// после отпускания кнопки мыши
	function moveSlider() {
		let elemAtEdge = findElemAtEdge(containerSlides);

		if (containerSlides.offsetLeft > 0) {
			containerSlides.style.left = '0px';
			return;
		}

		//let maxScroll = containerSlides.offsetParent.clientWidth - containerSlides.clientWidth;

		if (containerSlides.offsetLeft < maxScroll) {
			containerSlides.style.left = `${maxScroll}px`;
			return;
		}

		if (direction === 'right' && elemAtEdge.nextElementSibling) {
			containerSlides.style.left = -elemAtEdge.nextElementSibling.offsetLeft + 'px';
		} else if (direction === 'left') {
			containerSlides.style.left = -elemAtEdge.offsetLeft + 'px';
		}
		direction = undefined;
	}

	containerSlides.addEventListener('mousedown', function(e) {
		e.preventDefault();
		duration = e.pageX;
		containerSlides.style.left = containerSlides.offsetLeft + 'px';
		containerSlides.style.transition = 'none';
		containerSlides.addEventListener('mousemove', moveList);
	});

	document.addEventListener('mouseup', function(e) {
		containerSlides.style.transition = `left ${options.animateTime}s linear`;
		moveSlider(event);
		containerSlides.removeEventListener('mousemove', moveList);
	});

	// пользовательское событие нажатие кнопки направо чтобы установить направление движения 
	// (само событие определено в модуле навигации и всплывает до document)
	document.addEventListener('push-button-right', () => {
		direction = event.detail.name;
	});

	// пользовательское событие нажатие кнопки налево чтобы установить направление движения 
	document.addEventListener('push-button-left', () => {
		direction = event.detail.name;
	});
}

//// не удалять!!!
//// функция перемещения слайдера влево или вправо в зависимоти какая часть слайда больше
//// правая или левая после отпускания кнопки мыши
//function moveSlider() {
//	let elemAtEdge = findElemAtEdge(containerSlides);
//	let rightSideElem = elemAtEdge.offsetLeft + elemAtEdge.offsetWidth - Math.abs(containerSlides.offsetLeft);
//	let leftSideElem = elemAtEdge.offsetWidth - rightSideElem;
//
//	if (containerSlid2es.offsetLeft > 0) {14
//		containerSlides.style.left = '0px';
//		return;
//	}
//
//	let maxScroll = containerSlides.offsetParent.clientWidth - containerSlides.clientWidth;
//
//	if (containerSlides.offsetLeft < maxScroll) {
//		containerSlides.style.left = `${maxScroll}px`;
//		return;
//	}
//
//	if (leftSideElem <= rightSideElem) {
//		containerSlides.style.left = -1 * elemAtEdge.offsetLeft + 'px';
//	} else {
//		containerSlides.style.left = -1 * elemAtEdge.offsetLeft - elemAtEdge.offsetWidth + 'px';
//	}
//}