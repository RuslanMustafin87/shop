import '../../css/main.scss';
import './admin.scss';
import Modal from '../../components/moduls/myModal/myModal';


const addProduct = document.forms.addProduct;

addProduct.onsubmit = async function(event) {
	event.preventDefault();

	let formAddProduct = new FormData(this);

	formAddProduct = formaterForm(formAddProduct);

	if (!formAddProduct) {
		return Modal.start('Введите цену в формате числа');
	}

	let response;
	try {
		response = await fetch('http://localhost:3007/products/addproduct', {
			method: 'POST',
			body: formAddProduct
		});
	} catch {
		Modal.start('Ошибка');
	}

	let data = await response.json();

	Modal.start(data.message);

};

// функция форматирования формы

function formaterForm(form) {
	let price = form.get('price');
	let name = form.get('name');

	price = parseInt(price.trim());
	name = name.trim();

	if (isNaN(price)) {
		console.log(isNaN(price));
		return false;
	}

	name = name[0].toUpperCase() + name.slice(1).toLowerCase();

	form.set('price', price);
	form.set('name', name);

	return form;
}

let addImageAddPic = document.querySelector('#addImageProduct');
let addImageSpanAddPic = document.querySelector('#addImageProductSpan')
let formAddButtonReset = document.querySelector('.form-add-product__reset');

addImageSpanAddPic.innerHTML = 'Файл не выбран';

addImageAddPic.onchange = function(event) {
	if (this.files.length === 0) {
		addImageSpanAddPic.innerHTML = 'Файл не выбран';
	} else {
		addImageSpanAddPic.innerHTML = this.files[0].name;
	}
}

formAddButtonReset.onclick = function(){
	addImageSpanAddPic.innerHTML = 'Файл не выбран';
}


let addImage = document.querySelector('#addUpdateProduct');
let addImageSpan = document.querySelector('#addUpdateProductSpan')
let formUpdateButtonReset = document.querySelector('.form-update-product__reset');

addImageSpan.innerHTML = 'Файл не выбран';

addImage.onchange = function(event) {
	if (this.files.length === 0) {
		addImageSpan.innerHTML = 'Файл не выбран';
	} else {
		addImageSpan.innerHTML = this.files[0].name;
	}
}

formUpdateButtonReset.onclick = function(){
	addImageSpan.innerHTML = 'Файл не выбран';
}

