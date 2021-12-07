import config from '../../config.json';
import Basket from '../components/moduls/myBasket/myBasket';
let basket = new Basket();

const basketLink = document.getElementById('basket-link');

basketLink.onclick = function(event) {
	event.preventDefault();

	let listProductsInBasket = basket.getProductsFromBasket();
	let parametrs = [];

	listProductsInBasket.forEach((item, index) => {
		parametrs += `productId-${index}=${item.id}&`;
	});
	console.log('hh');
	fetch(`${config.SHOP_URL}:${config.PORT}/basket?${ parametrs }`, {
		method: 'GET',
	});
		// .then((response) => {
		// 	console.log( response );
		// });
};