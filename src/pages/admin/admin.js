import '../../css/main.scss';
import './admin.scss';
import Modal from '../../components/components/myModal/myModal';

import config from '../../../config.json';

const modal = new Modal();

// функция форматирования формы для добавления товара
function formaterForm(form) {

	if (form.has('name')) {
		let name = form.get('name');
		name = name.trim();
		name = name[0].toUpperCase() + name.slice(1).toLowerCase();
		form.set('name', name);
	}

	if (form.has('price')){
		let price = form.get('price');
		if (!validationPrice(price)) {
			return;
		}
		price = parseInt(price.replace(/\s+/g, ''));
		form.set('price', price);
	}

	return form;
}

// функция валидации поля цены
function validationPrice(price) {

	price = parseInt(price.replace(/\s+/g, ''));

	if (isNaN(price)) {
		modal.start('Введите цену в формате числа');
		return false;
	}
	return true;
}

// функция добавления множества картинок в formData
function addImagesIntoForm(input, form) {
	for (var i = 0; i < input.files.length; i++) {
		form.append(`image_${i}`, input.files[i], input.files[i].name);
	}
}

// отправка формы с новым товаром
const addProduct = document.forms.addProduct;
let addImage = document.querySelector('#addImageProduct');
let addImageSpan = document.querySelector('#addImageProductSpan')

addProduct.onsubmit = async function(event) {
	event.preventDefault();

	let formProduct = new FormData(this);

	formProduct = formaterForm(formProduct);
	if (formProduct === undefined) return;

	formProduct.delete('image');
	addImagesIntoForm(addImage, formProduct);

	let response;
	try {
		response = await fetch(`${config.URL}:${config.PORT}/admin/addproduct`, {
			method: 'POST',
			body: formProduct
		});
	} catch {
		modal.start('Ошибка');
	}

	let data = await response.json();

	modal.start(data.message);

	addProduct.reset();
};

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

// отправка формы для удаления товара
const deleteProduct = document.forms.deleteProduct;

deleteProduct.onsubmit = async function(event) {
	event.preventDefault();

	let response;
	try {
		response = await fetch(`${config.URL}:${config.PORT}/api/products/deleteproduct?id=${this.id.value}`, {
			method: 'DELETE',
		});
	} catch {
		modal.start('Ошибка');
	}

	let data = await response.json();

	modal.start(data.message);

	deleteProduct.reset();
};

// отправка формы для изменения товара
const updateProduct = document.forms.updateProduct;

updateProduct.onsubmit = async function(event) {
	event.preventDefault();

	let formProduct = new FormData(this)

	if (this.name.value === '' &&
		this.price.value === '' &&
		this.image.files.length === 0
	) {
		modal.start('Введите значение, которое надо изменить');
		return;
	}

	if (formProduct.get('name') === '') formProduct.delete('name');
	if (formProduct.get('price') === '') formProduct.delete('price');

	formProduct = formaterForm(formProduct);
	if (formProduct === undefined) return;

	let response;
	try {
		response = await fetch(`${config.URL}:${config.PORT}/admin/updateproduct`, {
			method: 'PUT',
			body: formProduct
		});
	} catch (err) {
		modal.start(err);
		return
	}

	let data = await response.json();

	modal.start(data.message);

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