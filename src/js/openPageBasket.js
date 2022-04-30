import config from '../../config.json';
import Basket from '../components/components/myBasket/myBasket';
let basket = new Basket();

const basketLink = document.getElementById('basket-link');

basketLink.onclick = function(event) {
	event.preventDefault();

	let listProductsInBasket = basket.getProductsFromBasket();
	let parametrs = [];

	listProductsInBasket.forEach((item, index) => {
		parametrs += `productId-${index}=${item.id}&`;
	});
	fetch(`${config.URL}:${config.PORT}/basket?${ parametrs }`, {
		method: 'GET',
	});
		// .then((response) => {
		// 	console.log( response );
		// });
};