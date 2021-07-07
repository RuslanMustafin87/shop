//import '../../exm';
import '../../css/main.scss';
import './index.scss';

import Sort from '../../js/sort';
import Basket from '../../components/blocks/basket/basket';
import '../../js/addProductInBasket';
import {
	pink
} from 'color-name';

const sort = new Sort();
const basket = new Basket();

let containerProducts = document.querySelector('.products');

// получение данных с сервера
let listProducts = null;

(async function getDataFromServer() {
	let data = null;
	try {
		let result = await fetch('http://127.0.0.1:3007/api/products');
		// {
		// method: 'GET',
		// headers: {
		// 'Content-Type': 'application/json; charset=utf-8',
		// },
		// });

		data = await result.json();

	} catch (err) {
		console.log(err);
	}

	listProducts = data;

	if (data) {
		sort.sortByIncrease(data);
		createListGoods(data)
	};
})();

// создаем контейнер с товарами
function createListGoods(data) {
	let product = document.createElement('li');
	let link = document.createElement('a');
	let button = document.createElement('button');
	let img = document.createElement('img');

	product.classList.add('product', 'products__item');
	link.classList.add('product__link');
	//link.setAttribute('href', 'product.html');
	button.classList.add('product__button');
	button.innerHTML = 'Добавить';

	product.append(link);
	product.append(img);
	product.append(button);

	data.forEach((item) => {
		let elem = product.cloneNode(true);

		elem.dataset.id = item._id;
		elem.dataset.name = item.name;
		elem.dataset.price = item.price;
		elem.dataset.background = item.background;

		elem.firstElementChild.setAttribute('href', `product.html?id=${item._id}`);

		if (item.image) {

			let imageBlob = new File([item.image.data], item.name);
			// console.log(imageBlob);

			elem.firstElementChild.nextElementSibling.src = URL.createObjectURL(imageBlob);

		}

		elem.prepend(`${item.name}: ${item.price}`);

		elem.style.backgroundColor = item.background;
		containerProducts.append(elem);
	});
}

// событие добавления товара в карзину
containerProducts.addEventListener('mousedown', function(event) {
	//event.stopPropagation();
	event.preventDefault();

	let elem = event.target.closest('.product__button');
	if (!elem) return;
	if (!containerProducts.contains(elem)) return;

	let elemParent = elem.closest('.products__item');

	basket.addProductInBasket(elemParent.dataset.id, elemParent.dataset.name, elemParent.dataset.price, elemParent.dataset.background);
});

// сортировка товара
let sortProducts = document.querySelector('.sort-products');

sortProducts.addEventListener('change', event => {
	clearContainer(containerProducts);
	switch (event.target.value) {
		case 'sortIncreasedPrice':
			sort.sortByIncrease(listProducts);
			createListGoods(listProducts);
			break;
		case 'sortDecreasedPrice':
			sort.sortByDecrease(listProducts);
			createListGoods(listProducts);
			break;
		case 'sortAlphabet':
			sort.sortByAlphabet(listProducts);
			createListGoods(listProducts);
			break;
	}
});

// функция очистки контейнера с товарами
function clearContainer(container) {
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
}

//document.addEventListener('click', function(){
//	event.preventDefault();
//	let link = event.target.closest('.product__link');
//	if (!link) return;
//	let linkParent = link.closest('li');
//	location.href = link.getAttribute('href') + `?id=${linkParent.dataset.id}`;
//});