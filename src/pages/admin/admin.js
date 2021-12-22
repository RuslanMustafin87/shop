import '../../css/main.scss';
import './admin.scss';
import Modal from '../../components/moduls/myModal/myModal';

import config from '../../../config.json';

const modal =  new Modal();

let formatter = new Intl.NumberFormat("ru", {
	style: 'currency',
	currency: 'RUB',
	useGrouping: true,
	maximumFractionDigits: 0
});

// функция форматирования формы для добавления товара
function formaterForm(form) {
	let price = form.get('price');
	let name = form.get('name');

	price = parseInt(price);
	name = name.trim();
	name = name[0].toUpperCase() + name.slice(1).toLowerCase();

	if (isNaN(price)) {
		return modal.start('Введите цену в формате числа');
	}

	price = formatter.format(price);

	form.set('price', price);
	form.set('name', name);

	return form;
}

// функция добавления множества картинок в formData
function addImagesIntoForm(input, form){
	for(var i = 0; i < input.files.length; i++){
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

	formProduct = formaterForm(formProduct);

	let response;
	try {
		response = await fetch(`${config.URL}:${config.PORT}/admin/updateproduct`, {
			method: 'POST',
			body: formProduct
		});
	} catch {
		modal.start('Ошибка');
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

