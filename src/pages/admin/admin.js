import '../../css/main.scss';
import './admin.scss';

import Modal from '../../components/moduls/modal/modal';
import {
	pink
} from 'color-name';

const delProd = document.forms.deleteProduct;

const addProduct = document.forms.addProduct;

addProduct.onsubmit = async function(){
	event.preventDefault();

	let response;
	
	try {
		response = await fetch('http://localhost:3007/api/products/addproduct', {
			method: 'POST',
			body: new FormData(addProduct)
		});
	} catch {
		Modal.start('Ошибка');
	}

	let data = await response.json();

	Modal.start(data.message);
};