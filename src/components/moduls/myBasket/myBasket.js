let countProducts = document.querySelector('.basket__count');
let listProductsInBasket = [];
let count = 0;

// добавление счетчика к иконке "корзина" если корзина с товароми не пуста при первой загрузке
if (localStorage.getItem('listProducts')) {
	listProductsInBasket = JSON.parse(localStorage.getItem('listProducts'));
	count = listProductsInBasket.length;
	countProducts.innerHTML = count;
	countProducts.style.display = 'block';
}

class Basket {
	getProductsFromBasket() {
		return JSON.parse(localStorage.getItem('listProducts'));
	}

	getOneProductFromBasket() {
		return JSON.parse(localStorage.getItem('oneProduct'));
	}

	addProductInBasket(id) {
		count++;
		countProducts.style.display = 'block';
		countProducts.innerHTML = count;
		listProductsInBasket.push({
			id: id
		});
		localStorage.setItem('listProducts', JSON.stringify(listProductsInBasket));
	}

	deleteProductFromBasket(id) {
		listProductsInBasket = JSON.parse(localStorage.getItem('listProducts'));
		let indexProduct;
		listProductsInBasket.find((item, index) => {
			if (item.id === id) {
				indexProduct = index;
				return true;
			}
		});

		listProductsInBasket.splice(indexProduct, 1);
		count = listProductsInBasket.length;
		if (count === 0) {
			//localStorage.removeItem('listProducts');
			this.resetBasket();
			return;
		}
		localStorage.setItem('listProducts', JSON.stringify(listProductsInBasket));
		countProducts.innerHTML = count;
	}

	changeProductsInBasket() {
		listProductsInBasket = JSON.parse(localStorage.getItem('listProducts'));
		count = listProductsInBasket.length;
		countProducts.innerHTML = count;
		countProducts.style.display = 'block';
	}

	resetBasket() {
		count = 0;
		listProductsInBasket = [];
		localStorage.removeItem('listProducts');
		countProducts.style.display = 'none';
	}
}

const basket = new Basket();

window.addEventListener('storage', (event) => {
	console.log('ki2');
	if (event.newValue === null) {
		basket.resetBasket();
		return;
	}
	basket.changeProductsInBasket();
});

export default Basket;