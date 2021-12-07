import '../../css/main.scss';
import './product.scss';

import config from '../../../config.json';

import MySlider from '../../components/moduls/mySlider/mySlider';
import Basket from '../../components/moduls/myBasket/myBasket';
import Modal from '../../components/moduls/myModal/myModal';

const modal = new Modal();

const basket = new Basket();
const idProduct = new URL(window.location.href).searchParams.get('id');

// TODO удалить если не нужно
let buttonAdd = document.querySelector('.product__button-add');
let data = null;

// получение картинок с сервера
(async function getProduct() {
	try {
		let responce = await fetch(`${config.SHOP_URL}:${config.PORT}/api/products/getproduct?id=${idProduct}`);

		data = await responce.json();

		if (!responce.ok){
			throw new Error(data.status)
		}

        let listImages = document.querySelectorAll('.my-slider__image');
        console.log(listImages.length);

		listImages.forEach((image, index) => {
			console.log(data);
			let imageBlob = new Blob([new Uint8Array(data.images[index].data)], {
				type: "image/jpeg"
			});

			image.src = URL.createObjectURL(imageBlob);
		})

	} catch (err) {
		console.log(err.message);
		buttonAdd.disabled = true;
	}

	MySlider.init({
		nav: true,
		drop: true,
		dots: true,
		infinite: true,
		animateTime: 0.3,
		autoplayInterval: 2
	});

})();

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
		let responce = await fetch(`${config.SHOP_URL}:${config.PORT}/product/updateratingproduct`, {
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