import '../../css/main.scss';
import './basket-page.scss';

import Basket from '../../components/blocks/basket/basket';
import '../../components/blocks/form-order/form-order';

const basket = new Basket();

let buttonResetBusket = document.querySelector('.button-reset-basket');
let containerProducts = document.querySelector('.products');
let blockSum =  document.querySelector('.basket-page__sum');

// функция очистки контейнера с товарами
function clearContainer(container) {
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
}

// функция создания контейнера с товарами
function createListGoods(data) {
	let product = document.createElement('li');
	let button = document.createElement('button');

	product.classList.add('product', 'products__item');
	button.classList.add('product__button-delete');
	button.innerHTML = 'Удалить';

	product.append(button);

	data.forEach((item) => {
		let elem = product.cloneNode(true);

		elem.dataset.id = item.id;
		elem.dataset.name = item.name;
		elem.dataset.price = item.price;

		elem.prepend(`${item.name}: ${item.price}`);

		elem.style.backgroundColor = item.background;
		containerProducts.append(elem);
	});
	console.log(data);
	blockSum.innerHTML = sumProducts(data);
}

// событие удаления товара из корзины
containerProducts.addEventListener('click', function(event) {
	let button = event.target.closest('.product__button-delete');
	if (!button) return;

	let buttonParent = button.closest('li');
	//if (!containerProducts.contains(elem)) return;

	basket.deleteProductFromBasket(buttonParent.dataset.id);

	buttonParent.remove();
	if (!containerProducts.firstChild) {
		containerProducts.innerHTML = 'Корзина пуста';
		return;
	}
});

// очистка карзины
buttonResetBusket.addEventListener('click', () => {
	clearContainer(containerProducts);
	basket.resetBasket();
	containerProducts.innerHTML = 'Корзина пуста';
});

// событие загрузки страницы и создание контейнера товаров
document.addEventListener('DOMContentLoaded', () => {
	let listProducts = basket.getProductsFromBasket();
	if (!listProducts) {
		containerProducts.innerHTML = 'Корзина пуста';
		return;
	}
	createListGoods(listProducts);
});

// событие изменения в локальном хранилище и добавление товара в карзину
window.addEventListener('storage', () => {
	clearContainer(containerProducts);
	let listProducts = basket.getProductsFromBasket();
	if (!listProducts) {
		containerProducts.innerHTML = 'Корзина пуста';
		return;
	}
	createListGoods(listProducts); 
});

// функция для подсчета общей суммы товаров
function sumProducts(list){
	let sum = 0;
	list = Array.from(list);
	console.log(list);
	list.forEach((item) => {
		sum += parseInt(item.price);
	});

	return sum;
}