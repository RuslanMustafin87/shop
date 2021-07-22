import '../../css/main.scss';
import './admin.scss';

import Modal from '../../components/moduls/myModal/myModal';


const addProduct = document.forms.addProduct;

addProduct.onsubmit = async function(event) {
	event.preventDefault();

	let formAddProduct = new FormData(addProduct);

	let reader = new FileReader();

	reader.readAsDataURL(imageProduct.files[0]);

	reader.onload = function() {
		formAddProduct.set('image', reader.result);
	}

	await new Promise(resolve => {
		setTimeout(resolve, 200);
	})

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