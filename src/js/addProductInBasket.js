/* eslint-disable no-inner-declarations */
import Basket from '../components/moduls/myBasket/myBasket';
const basket = new Basket();
//let containerProducts = document.querySelector('.products');

// событие добавления товара в карзину с помощью перетаскивания
document.addEventListener('pointerdown', function() {
	let target = event.target.closest('.products__item');
	if (!target) {return;}

	if (event.which === 1) { // проверка какая кнопка мыши нажата
		let basketMain = document.querySelector('.basket');
		let elem = target.cloneNode(true);
		
		elem.ondragstart = function() {
			return false;
		};

		let startDrop = false;
		let shiftX = 0;
		let shiftY = 0;

		// функция передвижения товара по экрану
		// eslint-disable-next-line no-inner-declarations
		function moveAt(clientX, clientY) {
			elem.style.left = clientX - shiftX + 'px';
			elem.style.top = clientY - shiftY + 'px';
		}

		// функция проверки над каким елементом находится курсор
		let mouseBasketAbove = false;

		function treckMouseAboveBasket(elem) {
			elem.hidden = true;
			let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
			elem.hidden = false;

			if (!elemBelow) {return;}

			elemBelow = elemBelow.closest('.basket');
			if (elemBelow) {
				elemBelow.style.transform = 'scale(1.5)';
				mouseBasketAbove = true;
				return;
			}

			basketMain.style.transform = 'scale(1)';
			mouseBasketAbove = false;
		}

		// функция начала перемещения и перемещения дроп-елемента
		function onMouseMove(event) {
			if (!startDrop) {
				createDropElem(elem, target);
				elem.style.left = target.getBoundingClientRect().left + 'px';
				elem.style.top = target.getBoundingClientRect().top + 'px';

				shiftX = event.clientX - elem.getBoundingClientRect().left;
				shiftY = event.clientY - elem.getBoundingClientRect().top;
				startDrop = true;
			}
			moveAt(event.clientX, event.clientY);
			treckMouseAboveBasket(elem);
		}

		document.addEventListener('pointermove', onMouseMove);

		document.onmouseup = function() {
			// если курсор над корзиной добовляем товар
			if (mouseBasketAbove) {
				basket.addProductInBasket(elem.dataset.id, elem.dataset.name, elem.dataset.price, elem.dataset.background);
				basketMain.style.transform = 'scale(1)';
				mouseBasketAbove = false;
			}
			// удаляем все лишнее после отжатия кнопки мыши
			document.removeEventListener('pointermove', onMouseMove);
			document.onmouseup = null;
			elem.remove();
			startDrop = false;
		};
	}
});

// функция создания дроп елемента
function createDropElem(elem, target) {
	document.body.append(elem);
	elem.style.width = target.offsetWidth + 'px';
	elem.style.height = target.offsetHeight + 'px';
	elem.style.zIndex = 1000;
	elem.style.position = 'fixed';
	elem.style.opacity = '.4';
	elem.style.margin = '0';
}

