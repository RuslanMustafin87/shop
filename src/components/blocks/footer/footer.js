import {
	showLoginWindow
} from '../../components/myLogin/mylogin';

const linkAdmin = document.getElementById('link-admin');

linkAdmin.onclick = function(event) {
	event.preventDefault();
	showLoginWindow();
};