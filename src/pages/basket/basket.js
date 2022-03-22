import '../../css/main.scss';
import './basket.scss';

import config from '../../../config.json';

import Basket from '../../components/components/myBasket/myBasket';
import '../../components/components/myLogin/mylogin';
import formOrder from '../../components/blocks/form-order/form-order';

const basket = new Basket();

let buttonResetBusket = document.getElementById('button-reset');
let containerProducts = document.getElementById('products');
let blockSum = document.getElementById('total-sum');

// функция очистки контейнера с товарами
function clearContainer(container) {
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
}

// функция создания контейнера с товарами
function createListGoods(data) {
	data.forEach((product) => {
		let elem = createProduct(product);
		containerProducts.append(elem);
	});

	blockSum.innerHTML = sumProducts(data);
}

// функция создания элемента товара и заполнение его данными
function createProduct(data) {

	let product = document.createElement('li');
	product.classList.add('product', 'products__item');
	product.dataset.id = data._id;
	product.dataset.name = data.name;
	product.dataset.price = data.price;

	let imageBlob = new Blob([new Uint8Array(data.image.data)], {
		type: "image/jpeg"
	});
	let imgSrc = URL.createObjectURL(imageBlob);

	product.insertAdjacentHTML('beforeend',
		`<a class='product__link' href='/product?id=${data._id}'> \
			<img class='product__image' src='${imgSrc}'> \
		</a> \
		<ul class='product__rating rating'> \
			<li class='rating__star' data-rating='${ data.rating.roundedRating == 5 ? true : undefined }'> \
			<li class='rating__star' data-rating='${ data.rating.roundedRating == 4 ? true : undefined }'> \
			<li class='rating__star' data-rating='${ data.rating.roundedRating == 3 ? true : undefined }'> \
			<li class='rating__star' data-rating='${ data.rating.roundedRating == 2 ? true : undefined }'> \
			<li class='rating__star' data-rating='${ data.rating.roundedRating == 1 ? true : undefined }'> \
		</ul> \
		<h1 class='product__name'>${ data.name }</h1> \
		<span class='product__price'>${ data.priceIntl }</span> \
		<button class='product__button-delete'>Удалить</button>`);

	return product;
}

// функция добавление товара в корзину
async function addProductIntoBasket(newValue) {

	let products = JSON.parse(newValue);
	let lastProduct = products[products.length - 1];
	let data;

	try {
		let result = await fetch(`${config.URL}:${config.PORT}/basket/getproducts`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify( [lastProduct] )
		});

		data = await result.json();

	} catch (err) {
		console.error(err);
	}

	let product = createProduct(data[0])

	if (!containerProducts.firstElementChild) {
		containerProducts.innerHTML = '';
	}

	containerProducts.append(product);

	blockSum.innerHTML = (+blockSum.innerHTML.replace(/\D/g, '') + +data[0].price).toLocaleString('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		useGrouping: true,
		maximumFractionDigits: 0,
		minimumFractionDigits: 0
	})
}

// событие удаления товара из корзины
containerProducts.addEventListener('click', function(event) {
	let button = event.target.closest('.product__button-delete');
	if (!button) {
		return;
	}

	let buttonParent = button.closest('li');

	basket.deleteProductFromBasket(buttonParent.dataset.id);

	blockSum.innerHTML = (blockSum.innerHTML.replace(/\D/g, '') - buttonParent.dataset.price).toLocaleString('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		useGrouping: true,
		maximumFractionDigits: 0,
		minimumFractionDigits: 0
	});

	buttonParent.remove();
	if (!containerProducts.firstChild) {
		containerProducts.innerHTML = 'Корзина пуста';
		blockSum.innerHTML = '0 &#8381';
		return;
	}

});

// очистка корзины
buttonResetBusket.addEventListener('click', () => {
	clearContainer(containerProducts);
	basket.resetBasket();
	containerProducts.innerHTML = 'Корзина пуста';
	blockSum.innerHTML = '0 &#8381';
});

// событие загрузки страницы и создание контейнера товаров
document.addEventListener('DOMContentLoaded', async function() {
	let listProducts = basket.getProductsFromBasket();

	if (!listProducts) {
		containerProducts.innerHTML = 'Корзина пуста';
		blockSum.innerHTML = '0 &#8381';
		return;
	}

	let products = [];

	try {
		let result = await fetch(`${config.URL}:${config.PORT}/basket/getproducts`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(listProducts)
		});

		products = await result.json();

	} catch (err) {
		console.log(err);
	}

	createListGoods(products);
});

// событие изменения в локальном хранилище и добавление товара в корзину
window.addEventListener('storage', (event) => {
	if (event.newValue) {
		addProductIntoBasket(event.newValue)
	}
});

// функция для подсчета общей суммы товаров
function sumProducts(list) {
	let sum = 0;
	list = Array.from(list);

	list.forEach((item) => {
		sum += +item.price;
	});

	return sum.toLocaleString('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		useGrouping: true,
		maximumFractionDigits: 0,
		minimumFractionDigits: 0
	});
}

