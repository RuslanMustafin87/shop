//import '../../exm';
import '../../css/main.scss';
import './index.scss';

import Sort from '../../js/sort';
import Basket from '../../components/moduls/myBasket/myBasket';
import '../../js/addProductInBasket';

const sort = new Sort();
const basket = new Basket();


let containerProducts = document.querySelector('.products');

// получение данных с сервера
let listProducts = null;

(async function getDataFromServer() {
	let data = null;
	try {
		let result = await fetch('http://127.0.0.1:3007/api/products');

		data = await result.json();

	} catch (err) {
		console.log(err);
	}

	listProducts = data;

	if (data) {
		sort.sortByIncrease(data);
		createListProducts(data)
	};
})();
// функция создания элемента продукта

function createElemProduct(){
	let product = document.createElement('li');
	let link = document.createElement('a');
	let imgBlock = document.createElement('div');
	let img = document.createElement('img');
	let name = document.createElement('span');
	let button = document.createElement('button');

	product.classList.add('product', 'products__item');
	link.classList.add('product__link');
	imgBlock.classList.add('product__image-block');
	img.classList.add('product__image');
	name.classList.add('product__name');
	button.classList.add('product__button');
	button.innerHTML = 'Добавить';

	product.append(link);
	link.append(imgBlock);
	imgBlock.append(img);
	link.append(name);
	link.append(button);

	return product;
}

// функция создания контейнера с продуктами
function createListProducts(data) {
	data.forEach((item) => {
		let elem = createElemProduct().cloneNode(true);

		elem.dataset.id = item._id;
		elem.dataset.name = item.name;
		elem.dataset.price = item.price;
		
		elem.firstElementChild.href = `product.html?id=${item._id}`;
		elem.firstElementChild.children[1].innerHTML = `${item.name[0].toUpperCase() + item.name.slice(1)} ${item.price}`

		if (item.image) {
			// let imageBlob = new Blob([new ArrayBuffer(item.image.data)], {
			// type: "image/jpeg"
			// });

			// const reader = new FileReader();
			// let imageBlob = new Blob([item.image], {
			// type: "image/jpeg"
			// });
			// reader.readAsDataURL(imageBlob);

			// ser.src = item.image;
			// console.log(imageBlob);
			elem.firstElementChild.firstElementChild.firstElementChild.src = item.image;

			// reader.onload = function(){
			// elem.firstElementChild.nextElementSibling.src = reader.result;
			// }
			// console.log(imageBlob);
			// elem.firstElementChild.href = URL.createObjectURL(imageBlob);
			// elem.firstElementChild.setAttribute('download', 'img.jpg');
			// elem.firstElementChild.nextElementSibling.src = window.URL.createObjectURL(imageBlob);

		}

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
			createListProducts(listProducts);
			break;
		case 'sortDecreasedPrice':
			sort.sortByDecrease(listProducts);
			createListProducts(listProducts);
			break;
		case 'sortAlphabet':
			sort.sortByAlphabet(listProducts);
			createListProducts(listProducts);
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