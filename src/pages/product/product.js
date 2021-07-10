import '../../css/main.scss';
import './product.scss';

import MySlider from '../../components/moduls/mySlider/mySlider';
import Basket from '../../components/moduls/myBasket/myBasket';

MySlider.init({
	nav: true,
	drop: true,
	dots: true,
	infinite: true,
	animateTime: 0.5,
	autoplay: false,
	autoplayInterval: 2
});

const basket = new Basket();
const idProduct = new URL(window.location.href).searchParams.get('id');

let productPicture = document.querySelector('.product__pictures');
let productName = document.querySelector('.product__name');
let productPrice = document.querySelector('.product__price');
let buttonAdd = document.querySelector('.product__button-add');

// функция добавления на страницу даных с сервера 
function getDataAndInsert(picture, name, price){
	productPicture.style.background = picture;
	productName.innerHTML = name;
	productPrice.innerHTML = `Price: ${new Intl.NumberFormat('en-US').format(price)} $`;
}

let data = null;

(async function getProduct() {
	try {
		let responce = await fetch('http://127.0.0.1:3007/api/products/getproduct', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
				id: idProduct
			})
		});

		data = await responce.json();
		
		if (!responce.ok){
			throw new Error(data.status)
		}
        getDataAndInsert(data.background, data.name, data.price)
        
	} catch (err) {
		console.log(err.message);
		buttonAdd.disabled = true;
	}
})();

// событие добавления товара в корзину
buttonAdd.addEventListener('click', function(){
	basket.addProductInBasket(data._id, data.name, data.price, data.background);
})