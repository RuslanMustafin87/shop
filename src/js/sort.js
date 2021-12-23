export default class Sort {
	sortByIncrease(arr) {
		arr.sort((a, b) => {
			return a.dataset.price - b.dataset.price;
		});
	}

	sortByDecrease(arr) {
		arr.sort((a, b) => {
			return b.dataset.price - a.dataset.price;
		});
	}

	sortByAlphabet(arr) {
		arr.sort((a, b) => {
			return a.dataset.name < b.dataset.name ? -1 : 1;
		});
	}
}