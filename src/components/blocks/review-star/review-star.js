// отправка рейтинга на сервер
// function isCheck(name) {
//     return document.querySelector(`input[name="${name}"]:checked`);
// }

// let buttonRating = document.getElementById('review-button');

// buttonRating.onclick = async function() {
// 	let checked = isCheck('review');
// 	console.log('ji');
// 	if (!checked) {
// 		return console.log('error!');
// 	}

// 	try {
// 		let responce = await fetch(`${config.URL}:${config.PORT}/product/updateratingproduct`, {
// 			method: 'PUT',
// 			headers: {
// 				'Content-Type': 'application/json;charset=utf-8'
// 			  },
// 			body: JSON.stringify({
// 				id: idProduct,
// 				rating: parseInt(checked.value)
// 			}),
// 		});

// 		data = await responce.json();

// 		if (!responce.ok){
// 			throw new Error(data.message);
// 		} else {
// 			checked.checked = false;
// 			modal.start('Спасибо за отзыв!');
// 		}

// 	} catch (err) {
// 		console.log('Ошибка ' + err.message);
// 	}
// };