import '../../css/main.scss';
import './admin.scss';

import Modal from '../../components/moduls/myModal/myModal';


const addProduct = document.forms.addProduct;

addProduct.onsubmit = async function(event) {
	event.preventDefault();
// 
	// let reader = new FileReader();
// 
	// reader.readAsArrayBuffer(imageProduct.files[0]);
// 
	// reader.onload = function() {
// 
		// formAddProduct.set('image', new Blob([reader.result], {type: 'image/jpeg'}));
	// }
// 
	// await new Promise(resolve => {
		// setTimeout(resolve, 100);
	// })
	
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