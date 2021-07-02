import '../../css/main.scss';
import './testStand.scss';

import '../../components/moduls/slider/mySlider';

//тест появления подсказки при остановке на елементе

let item2 = document.querySelector('.item2');
let item3 = document.querySelector('.item3');

let tooltip = document.createElement('div');
tooltip.className = 'tooltip';
tooltip.innerHTML = 'Tooltip';

let lastX;
let lastY;
let lastTime;
let prevX;
let prevY;
let prevTime;
let isHover = false;
let checkSpeed;
let isOverElem = false;

item2.addEventListener('mouseover', function() {
	if (isOverElem) {
		return;
	}
	isOverElem = true;
	prevX = event.pageX;
	prevY = event.pageY;
	prevTime = Date.now();
	item2.addEventListener('mousemove', mouseMove);
	checkSpeed = setInterval(trackSpeed, 100);
});
item2.addEventListener('mouseout', function() {
	if (!event.relatedTarget || !item2.contains(event.relatedTarget)) {
		isOverElem = false;
		item2.removeEventListener('mousemove', mouseMove);
		clearInterval(checkSpeed);
		if (isHover) {
			isHover = false;
			tooltip.remove();
		}
	}
});

function mouseMove() {
	lastX = event.pageX;
	lastY = event.pageY;
	lastTime = Date.now();
}

function trackSpeed() {
	let speed;
	if (!lastTime || lastTime === prevTime) {
		speed = 0;
	} else {
		speed = Math.sqrt(Math.pow(lastX - prevX, 2) + Math.pow(lastY - prevY, 2)) / (lastTime - prevTime);
	}
	if (speed < 0.1) {
		item2.append(tooltip);
		isHover = true;
		clearInterval(checkSpeed);
	} else {
		prevX = lastX;
		prevY = lastY;
		prevTime = lastTime;
	}
}

// тест drag-n-drop

let ball = document.querySelector('.ball');

ball.addEventListener('mousedown', function() {

	let shiftX = event.clientX - ball.getBoundingClientRect().left;
	let shiftY = event.clientY - ball.getBoundingClientRect().top;

	ball.style.position = 'absolute';
	ball.style.zIndex = 1000;

	document.body.append(ball);

	moveAt(event.pageX, event.pageY);

	function moveAt(pageX, pageY) {
		console.log(pageX);
		if (pageX < ball.offsetWidth) {
			console.log('hi');
			ball.style.left = 0 + 'px';
			return;
		}
		let rightEdge = document.documentElement.clientWidth - ball.offsetWidth;
		if (pageX > rightEdge) {
			ball.style.left = rightEdge;
		}
		ball.style.left = pageX - shiftX + 'px';
		ball.style.top = pageY - shiftY + 'px';
	}

	function onMouseMove(event) {
		moveAt(event.pageX, event.pageY);
	}

	document.addEventListener('mousemove', onMouseMove);

	ball.onmouseup = function() {
		document.removeEventListener('mousemove', onMouseMove);
		ball.onmouseup = null;
	};
});

ball.ondragstart = function() {
	return false;
};

// задача из учебника
let ball2 = document.querySelector('.ball2');
let field = document.querySelector('.field');

ball2.addEventListener('mousedown', function() {
	event.preventDefault();

	ball2.ondragstart = function() {
		return false;
	};

	let shiftX = event.clientX - ball2.getBoundingClientRect().left;
	let shiftY = event.clientY - ball2.getBoundingClientRect().top;

	//ball2.style.position = 'fixed';

	//moveAt(event.clientX, event.clientY);

	function moveAt(pageX, pageY) {

		let newY = pageY - shiftY;
		let x = pageX - shiftX - field.getBoundingClientRect().left;
		let y = newY - field.getBoundingClientRect().top;

		let newBottom = newY + ball2.offsetHeight;
		if (newBottom > document.documentElement.clientHeight) {

			let docBottom = document.documentElement.getBoundingClientRect().bottom;
			let scrollY = Math.min(docBottom - newBottom, 10);
			if (scrollY < 0) {
				scrollY = 0;
			}
			//console.log(field.getBoundingClientRect().top);
			y = Math.min(newY, document.documentElement.clientHeight - ball2.offsetHeight) - field.getBoundingClientRect().top;
			//console.log(y);
			//console.log(document.documentElement.clientHeight);
			window.scrollBy(0, scrollY);
		}

		if (x < 0) {
			x = 0;
		}
		if (y < 0) {
			y = 0;
		}
		let rightEdge = field.clientWidth - ball2.offsetWidth;
		if (x > rightEdge) {
			x = rightEdge;
		}
		let bottomEdge = field.clientHeight - ball2.offsetHeight;
		if (y > bottomEdge) {
			y = bottomEdge;
		}

		ball2.style.left = x + 'px';
		ball2.style.top = y + 'px';
	}

	function onMouseMove(event) {
		moveAt(event.clientX, event.clientY);
	}

	document.addEventListener('mousemove', onMouseMove);

	document.onmouseup = function() {
		//console.log(ball2.getBoundingClientRect().bottom);
		//console.log(ball2.style.top + ball2.offsetHeight);
		document.removeEventListener('mousemove', onMouseMove);
		document.onmouseup = null;
	};
});

// модальная форма
const buttonModal = document.querySelector('.button-modal');

buttonModal.addEventListener('click', function() {

	let modal2 = document.forms['modal2'];
	let modalCover = document.querySelector('.modal-cover');
	modal2.modalInput.focus();

	modal2.style.display = 'block';
	modalCover.style.display = 'block';

	modal2.addEventListener('submit', function() {
		event.preventDefault();
		console.log(modal2.modalInput.value);
		foo();
	});

	modal2.modalCancel.addEventListener('keydown', function() {
		if (event.key === 'Tab' && !event.shiftKey) {
			modal2.modalInput.focus();
			event.preventDefault();
		}
	});

	modal2.modalInput.addEventListener('keydown', function() {
		if (event.key === 'Tab' && event.shiftKey) {
			modal2.modalCancel.focus();
			event.preventDefault();
		}
	});

	modal2.modalCancel.addEventListener('click', foo);

	document.addEventListener('keydown', function() {
		if (event.key === 'Escape') {
			foo();
		}
	});

	function foo() {
		modal2.remove();
		modalCover.remove();
	}
});

let grid = document.querySelector('#grid');
let observer = new MutationObserver((mutationRecords) => {
	console.log(mutationRecords);
});

observer.observe(grid, {
	childList: true
});

grid.prepend(document.createElement('div'));
