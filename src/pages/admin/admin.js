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

function formaterForm(form){
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