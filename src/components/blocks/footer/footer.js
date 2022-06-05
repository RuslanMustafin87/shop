import {
	showLoginAdminWindow
} from '../../components/login-admin/login-admin';

const linkAdmin = document.getElementById('link-admin');

linkAdmin.onclick = function(event) {
	event.preventDefault();
	showLoginAdminWindow();
};