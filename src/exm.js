setTimeout(() => {
	let block = document.querySelector('.block');

	let coord = block.getBoundingClientRect();

	console.log(coord);
	console.log(block);
}, 2000);