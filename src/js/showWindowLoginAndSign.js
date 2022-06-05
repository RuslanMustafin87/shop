import {
	showLoginAdminWindowError
} from '../components/components/login-admin/login-admin';
import {
	showSignWindowSuccessfully,
	showSignWindowError
} from '../components/components/sign-user/sign-user';
import {
	// showLoginUserWindow,
	showLoginUserWindowError
} from '../components/components/loginUser/loginUser';

window.onload = function() {
	let url = new URL(document.location.href);
	let params = url.searchParams;

	if (params.get('msgSignSuccessfully')) return showSignWindowSuccessfully();

	if (params.get('msgSignError')) return showSignWindowError(params.get('msgSignError'));

	if (params.get('msgLoginError')) return showLoginUserWindowError(params.get('msgLoginError'));

	if (params.get('msgLoginAdminError')) showLoginAdminWindowError(params.get('msgLoginAdminError'));

};