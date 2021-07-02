import Basket from '../basket/basket';
import Modal from '../../moduls/modal/modal';
let basket = new Basket();
const modal = new Modal();

let formOrder = document.forms.formOrder;

class Product {
	constructor(id, name, price){
		this.id = id;
		this.name = name;
		this.price = price;
	}
}

formOrder.addEventListener('submit', function(event) {
	event.preventDefault();

	let productsInBasket = 	Array.from(document.querySelectorAll('.product'));
	let productList = [];
	let sum = 0;

	productsInBasket.forEach((item) => {
		sum += parseInt(item.dataset.price);
	});

	productsInBasket.forEach((item, index) => {
		productList[index] = new Product(item.dataset.id, item.dataset.name, item.dataset.price);
	});

	fetch('http://127.0.0.1:3007/api/clients', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
		body: JSON.stringify({
			name: formOrder.name.value,
			phone: formOrder.phone.value,
			sum: sum,
			productList: productList
		})
	}).then(
		res => {
			return res.json();
		},
		err => {
			modal.start('Сервер не доступен');
		}
	).then(
		body => {
			modal.start(body.status);
		}
	);
});