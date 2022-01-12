import Basket from '../../moduls/myBasket/myBasket';
import Modal from '../../moduls/myModal/myModal';

import config from '../../../../config.json';

const modal = new Modal();

let formOrder = document.forms.formOrder;

formOrder.addEventListener('submit', function(event) {
	event.preventDefault();

	let productsInBasket = Array.from(document.querySelectorAll('.product'));
	let productList = [];
	let total = 0;

	productsInBasket.forEach((item) => {
		total += parseInt(item.dataset.price);
		productList.push(item.dataset.id);
	});

	fetch(`${config.URL}:${config.PORT}/basket/addorder`, {
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
			formOrder.reset();
			return res.json();
		}
	).then(
		body => modal.start(body.message)
	).catch(
		err => modal.start(err.message)
	);
});

// маска в поле ввода телефона
window.addEventListener('DOMContentLoaded', function() {

	function setCursorPosition(pos, elem) {

		elem.focus();

		if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);

		else if (elem.createTextRange) {

			var range = elem.createTextRange();

			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();

		}

	}

	function mask(event) {

		var matrix = '+7 (___) ___ ____',
			i = 0,
			def = matrix.replace(/\D/g, ''),
			val = this.value.replace(/\D/g, '');

		if (def.length >= val.length) val = def;

		this.value = matrix.replace(/./g, function(a) {
			return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
		});

		if (event.type === 'blur') {
			if (this.value.length === 2) this.value = '';
		} else setCursorPosition(this.value.length, this);

	}

	var input = document.getElementById('phone');
	input.addEventListener('input', mask, false);
	input.addEventListener('focus', mask, false);
	input.addEventListener('blur', mask, false);
});