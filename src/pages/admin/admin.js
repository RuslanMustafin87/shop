import '../../css/main.scss';
import './admin.scss';
import Modal from '../../components/moduls/myModal/myModal';
import imgCross from '../../images/icons/cross.svg';

// функция форматирования формы

function formaterForm(form) {
	let price = form.get('price');
	let name = form.get('name');

	price = parseInt(price.trim());
	console.log(price);
	name = name.trim();
	name = name[0].toUpperCase() + name.slice(1).toLowerCase();

	form.set('price', price);
	form.set('name', name);

	return form;
}

// отправка формы с новым товаром
const addProduct = document.forms.addProduct;

addProduct.onsubmit = async function(event) {
	event.preventDefault();

	let formProduct = new FormData(this);

	formProduct = formaterForm(formProduct);

	if (isNaN(formProduct.get('price'))) {
		return Modal.start('Введите цену в формате числа');
	}

	let response;
	try {
		response = await fetch('http://localhost:3007/admin/addproduct', {
			method: 'POST',
			body: formProduct
		});
	} catch {
		Modal.start('Ошибка');
	}

	let data = await response.json();

	Modal.start(data.message);

	addProduct.reset();
};

let addImage = document.querySelector('#addImageProduct');
let addImageSpan = document.querySelector('#addImageProductSpan')

addImage.onchange = function(event) {
	if (this.files.length === 0) {
		addImageSpan.innerHTML = 'Файл не выбран';
	} else {
		addImageSpan.innerHTML = this.files[0].name;
	}
}

addProduct.onreset = function() {
	addImageSpan.innerHTML = 'Файл не выбран';
}

// отправка формы для изменения товара
const updateProduct = document.forms.updateProduct;

updateProduct.onsubmit = async function(event) {
	event.preventDefault();

	let formProduct = new FormData(this);

	if (formProduct.get('name') === '' &&
		formProduct.get('price') === '' &&
		formProduct.get('image').name === ''
	) {
		Modal.start('Введите значение, которое надо изменить');
		return;
	}

	formProduct = formaterForm(formProduct);

	if (isNaN(formProduct.get('price'))) {
		formProduct.set('price', '');
	}

	let response;
	try {
		response = await fetch('http://localhost:3007/admin/updateproduct', {
			method: 'POST',
			body: formProduct
		});
	} catch {
		Modal.start('Ошибка');
	}

	let data = await response.json();

	Modal.start(data.message);

	updateProduct.reset();
};

let updateImage = document.querySelector('#updateImageProduct');
let updateImageSpan = document.querySelector('#updateImageProductSpan');

updateImage.onchange = function(event) {
	if (this.files.length === 0) {
		updateImageSpan.innerHTML = 'Файл не выбран';
	} else {
		updateImageSpan.innerHTML = this.files[0].name;
	}
}

updateProduct.onreset = function() {
	updateImageSpan.innerHTML = 'Файл не выбран';
}