import '../../css/main.scss';
import './product.scss';
import logo from '../../images/logo-light.png';

import MySlider from '../../components/moduls/mySlider/mySlider';
import Basket from '../../components/moduls/myBasket/myBasket';
import Modal from '../../components/moduls/myModal/myModal';

const modal = new Modal();

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
console.log(new URL(window.location.href));
// TODO удалить если не нужно
let productName = document.querySelector('.product__name');
let productPrice = document.querySelector('.product__price');
let buttonAdd = document.querySelector('.product__button-add');

let data = null;

// TODO удалить если не нужно
(async function getProduct() {
	try {
		let responce = await fetch('http://127.0.0.1:3007/api/products/getproduct?id=614b8667c9ff72909bdb631d');

		data = await responce.json();
		
		if (!responce.ok){
			throw new Error(data.status)
		}
        // getDataAndInsert(data.background, data.name, data.price)
        
		console.log(data);
	} catch (err) {
		console.log(err.message);
		buttonAdd.disabled = true;
	}
});

// событие добавления товара в корзину
buttonAdd.addEventListener('click', function(){
	basket.addProductInBasket(idProduct);
})

// отправка рейтинга на сервер

function isCheck(name) {
    return document.querySelector(`input[name="${name}"]:checked`);
}

let buttonRating = document.querySelector('.product__button-review');

buttonRating.onclick = async function() {
	let checked = isCheck('review');
	
	if (!checked) {
		return console.log('error!');
	}
	console.log(checked);
	try {
		let responce = await fetch('http://127.0.0.1:3007/product/updateratingproduct', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			  },
			body: JSON.stringify({
				id: idProduct,
				rating: parseInt(checked.value)
			}),
		});

		data = await responce.json();
		
		if (!responce.ok){
			throw new Error(data.message);
		} else {
			checked.checked = false;
			modal.start('Спасибо за отзыв!');
		}
        
	} catch (err) {
		console.log('Ошибка ' + err.message);
	}
};