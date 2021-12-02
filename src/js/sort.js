export default class Sort {
	sortByIncrease(arr) {
		arr.sort((a, b) => {
			return a.dataset.price.replace(/\D/g, '') - b.dataset.price.replace(/\D/g, '');
		});
	}
	
	sortByDecrease(arr) {
		arr.sort((a, b) => {
			return b.dataset.price.replace(/\D/g, '') - a.dataset.price.replace(/\D/g, '');
		});
	}

	sortByAlphabet(arr) {
		arr.sort((a, b) => {
			return a.dataset.name < b.dataset.name ? -1 : 1;
		});
	}
}