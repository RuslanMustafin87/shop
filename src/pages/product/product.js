import '../../css/main.scss';
import './product.scss';

import config from '../../../config.json';

import '../../components/components/menu-nav/menu-nav';

import MySlider from '../../components/components/mySlider/mySlider';
import Basket from '../../components/components/myBasket/myBasket';
import Modal from '../../components/components/myModal/myModal';

import '../../components/blocks/header/header';
import '../../components/blocks/footer/footer';
import '../../js/showWindowLoginAndSign';

const modal = new Modal();
const mySlider = new MySlider();

const basket = new Basket();
const idProduct = new URL(window.location.href).searchParams.get('id');

const slider = document.getElementById('my-slider');
let buttonAdd = document.querySelector('.product__button-add');
let data = null;

// получение картинок с сервера
(async function getProduct() {
	try {
		let responce = await fetch(`${config.URL}:${config.PORT}/api/products/getproduct?id=${idProduct}`);
		data = await responce.json();

        let listImages = data.images;

		listImages.forEach((image, index) => {

			let imageBlob = new Blob([new Uint8Array(image.data)], {
				type: "image/jpeg"
			});

			const src = URL.createObjectURL(imageBlob);

			slider.append(mySlider.addSlide(src, data.name));
		})

	} catch (err) {
		buttonAdd.disabled = true;
	}

	mySlider.init({
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

let buttonReview = document.getElementById('review-button');

buttonReview.onclick = async function() {
	let checked = isCheck('review');

	if (!checked) {
		return modal.start('Нет оценки');
	}

	try {
		let responce = await fetch(`${config.URL}:${config.PORT}/product/updateratingproduct`, {
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
		modal.start(err.message);
	}
};

