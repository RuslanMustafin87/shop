import '../../css/main.scss';
import './admin.scss';
import Modal from '../../components/moduls/myModal/myModal';

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

	price = parseInt(price.trim());
	name = name.trim();
	name = name[0].toUpperCase() + name.slice(1).toLowerCase();

	if (isNaN(price)) {
		return Modal.start('Введите цену в формате числа');
	}
	
	price = formatter.format(price);

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

// отправка формы для удаления товара
const deleteProduct = document.forms.deleteProduct;

deleteProduct.onsubmit = async function(event) {
	event.preventDefault();

	let response;
	try {
		response = await fetch(`http://localhost:3007/api/products/deleteproduct?id=${this.id.value}`, {
			method: 'DELETE',
		});
	} catch {
		Modal.start('Ошибка');
	}

	let data = await response.json();

	Modal.start(data.message);

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
		Modal.start('Введите значение, которое надо изменить');
		return;
	}

	formProduct = formaterForm(formProduct);

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