import '../../css/main.scss';
import './basket.scss';

import config from '../../../config.json';

import Basket from '../../components/moduls/myBasket/myBasket';

const basket = new Basket();

// форматирование в формат валюты для итоговой суммы
let formatter = new Intl.NumberFormat("ru", {
	style: 'currency',
	currency: 'RUB',
	useGrouping: true,
	maximumFractionDigits: 0
});

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
	let link = document.createElement('a');
	let img = document.createElement('img');
	let rating = document.createElement('div');
	let starGroup = document.createElement('ul');
	let star = document.createElement('li');
	let name = document.createElement('span');
	let price = document.createElement('span');
	let button = document.createElement('button');

	product.classList.add('product', 'products__item');
	link.classList.add('product__link');
	img.classList.add('product__image');
	rating.classList.add('product__rating', 'rating');
	starGroup.classList.add('rating__group');
	star.classList.add('rating__star');
	name.classList.add('product__name');
	price.classList.add('product__price');
	button.classList.add('product__button-delete');
	button.innerHTML = 'Удалить';

	let imageBlob = new Blob([new Uint8Array(data.image.data)], {
		type: "image/jpeg"
	});

	img.src = URL.createObjectURL(imageBlob);

	link.href = `/product?id=${data._id}`;
	
	for (let i = 0; i < 5; i++) {
		starGroup.append(star.cloneNode(true));
	}

	if (data.rating.roundedRating) {
		Array.from(starGroup.children)[5 - data.rating.roundedRating].setAttribute('data-rating', 'true');
	}

	name.innerHTML = data.name;
	price.innerHTML = data.price;

	product.dataset.id = data._id;
	product.dataset.name = data.name;
	product.dataset.price = data.price;

	link.append(img);
	product.append(link);
	rating.append(starGroup);
	product.append(rating);
	product.append(name);
	product.append(price);
	product.append(button);

	return product;
}

// функция добавление товара в корзину
async function addProductIntoBasket(newValue) {

	let products = JSON.parse(newValue);
	let lastProduct = products[products.length - 1];
	let data;

	try {
		let result = await fetch(`${config.SHOP_URL}:${config.PORT}/basket/getimages`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify([lastProduct])
		});

		data = await result.json();

	} catch (err) {
		console.log(err);
	}

	let product = createProduct(data[0])

	if (!containerProducts.firstElementChild) {
		containerProducts.innerHTML = '';
	}

	containerProducts.append(product);

	blockSum.innerHTML = formatter.format(+blockSum.innerHTML.replace(/\D/g, '') + +data[0].price.replace(/\D/g, ''));
}

// событие удаления товара из корзины
containerProducts.addEventListener('click', function(event) {
	let button = event.target.closest('.product__button-delete');
	if (!button) {
		return;
	}

	let buttonParent = button.closest('li');

	basket.deleteProductFromBasket(buttonParent.dataset.id);

	blockSum.innerHTML = formatter.format(blockSum.innerHTML.replace(/\D/g, '') - buttonParent.dataset.price.replace(/\D/g, ''));

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
		let result = await fetch(`${config.SHOP_URL}:${config.PORT}/basket/getimages`, {
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
		sum += +item.price.replace(/\D/g, '');
	});

	return formatter.format(sum);
}