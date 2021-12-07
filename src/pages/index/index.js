import '../../css/main.scss';
import './index.scss';
import '../../images/logo-light.png'

import config from '../../../config.json';

import Sort from '../../js/sort';
import Basket from '../../components/moduls/myBasket/myBasket';
import '../../js/addProductInBasket';
import '../../js/openPageBasket';

const sort = new Sort();
const basket = new Basket();

let containerProducts = document.querySelector('.products');

// получение данных с сервера
let listProducts = null;
let listProductsInContainer = null;

(async function getDataFromServer() {
	let data = null;
	try {
		let result = await fetch(`${config.SHOP_URL}:${config.PORT}/api/products`);

		data = await result.json();

	} catch (err) {
		console.error(err);
	}

	if (data) {
		insertImageInProducts(data);
		listProducts = listProductsInContainer = Array.from(document.querySelectorAll('.product'));
	};
})();

// функция наполнения контейнера с продуктами элементами продуктов
function insertElemOfProduct(products) {
	products.forEach(function(elem, index) {
		containerProducts.append(elem);
	});
}

// функция вставки картинок в контейнер с продуктами
function insertImageInProducts(data) {

	let products = document.querySelectorAll('.product__image');

	for (let i = 0; i < products.length; i++) {

		let imageBlob = new Blob([new Uint8Array(data[i].images[0].data)], {
			type: "image/jpeg"
		});

		products[i].src = URL.createObjectURL(imageBlob);
	}
}

// событие добавления товара в карзину
containerProducts.addEventListener('mousedown', function(event) {
	event.preventDefault();

	let elem = event.target.closest('.product__button');
	if (!elem) return;
	if (!containerProducts.contains(elem)) return;

	let elemParent = elem.closest('.products__item');

	basket.addProductInBasket(elemParent.dataset.id);
});

// сортировка товара
let sortProducts = document.querySelector('.sort-products');

let eventSort = new Event('change');

sortProducts.addEventListener('change', event => {
	clearContainer(containerProducts);
	switch (event.target.value) {
		case 'sortIncreasedPrice':
			sort.sortByIncrease(listProductsInContainer);
			insertElemOfProduct(listProductsInContainer);
			break;
		case 'sortDecreasedPrice':
			sort.sortByDecrease(listProductsInContainer);
			insertElemOfProduct(listProductsInContainer);
			break;
		case 'sortAlphabet':
			sort.sortByAlphabet(listProductsInContainer);
			insertElemOfProduct(listProductsInContainer);
			break;
	}
});

// функция очистки контейнера с товарами
function clearContainer(container) {
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
}

// функция фильтрации по категории товара
function filterProductsByCategory(list, category) {
	clearContainer(containerProducts);
	listProductsInContainer = list.filter(item => item.dataset.category === category);
	sortProducts.dispatchEvent(eventSort);
}

// событие фильтрации по категории товара
let sortProductsByCategory = document.querySelector('.sort-products-by-category');

sortProductsByCategory.onchange = function(event) {
	if (event.target.value === 'all') {
		clearContainer(containerProducts);
		listProductsInContainer = listProducts;
		sortProducts.dispatchEvent(eventSort);
		return;
	}
	filterProductsByCategory(listProducts, event.target.value);
}

// ------------
// const basketLink = document.getElementById('basket-link');

// basketLink.onclick = function(event) {
// 	event.preventDefault();

// 	let listProductsInBasket = basket.getProductsFromBasket();
// 	let parametrs = [];

// 	listProductsInBasket.forEach((item, index) => {
// 		parametrs += `productId-${index}=${item.id}&`;
// 	});

// 	fetch(`${config.SHOP_URL}:${config.PORT}/basket?${ parametrs }`)
// 		.then((response) => {
// 			console.log( response );
// 		});
// };