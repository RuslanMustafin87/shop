export default class Sort {

	sortByIncrease(arr) {
		arr.sort((a, b) => {
			return a.price - b.price;
		});
	}

	sortByDecrease(arr) {
		console.log('hi');
		arr.sort((a, b) => {
			return b.price - a.price;
		});
	}

	sortByAlphabet(arr) {
		arr.sort((a, b) => {
			return a.name < b.name ? -1 : 1;
		});
	}
}