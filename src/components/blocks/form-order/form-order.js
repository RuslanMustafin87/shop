import Basket from '../../moduls/myBasket/myBasket';
import Modal from '../../moduls/myModal/myModal';

import config from '../../../../config.json';

const modal = new Modal();

let basket = new Basket();

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
	let total = 0;

	productsInBasket.forEach((item) => {
		total += parseInt(item.dataset.price.replace(/\D/g, ''));
		productList.push(item.dataset.id);
	});
	console.log( productList);
	fetch(`${config.URL}:${config.PORT}/api/orders/addorder`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
		body: JSON.stringify({
			name: formOrder.name.value,
			phone: formOrder.phone.value,
			total: total,
			productList: productList
		})
	}).then(
		res => {
			res.json();
			formOrder.reset();
		}
	).then(
		body => modal.start(body.message)
	).catch(
		err => modal.start(err.message)
	);
});