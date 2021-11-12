export default class Sort {

	sortByIncrease(arr) {
		arr.sort((a, b) => {
			return parseInt(a.dataset.price) - parseInt(b.dataset.price);
		});
	}

	sortByDecrease(arr) {
		arr.sort((a, b) => {
			return parseInt(b.dataset.price) - parseInt(a.dataset.price);
		});
	}

	sortByAlphabet(arr) {
		arr.sort((a, b) => {
			return a.dataset.name < b.dataset.name ? -1 : 1;
		});
	}
}