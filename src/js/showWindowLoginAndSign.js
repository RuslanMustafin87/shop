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

	url.pathname = url.pathname.replace(/authuser|adduser/, '');
	window.history.replaceState(null, null, url.toString());

	if (params.has('msgSignSuccessfully')) return showSignWindowSuccessfully();

	if (params.has('msgSignError')) return showSignWindowError(params.get('msgSignError'));

	if (params.has('msgLoginError')) return showLoginUserWindowError(params.get('msgLoginError'));

	if (params.has('msgLoginAdminError')) showLoginAdminWindowError(params.get('msgLoginAdminError'));
};