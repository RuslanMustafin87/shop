import {
	showLoginWindowError
} from '../components/components/myLogin/mylogin';
import {
	showSignWindowSuccessfully,
	showSignWindowError
} from '../components/components/mySign/mySign';
import {
	// showLoginUserWindow,
	showLoginUserWindowError
} from '../components/components/loginUser/loginUser';

window.onload = function() {

	let params = (new URL(document.location.href)).searchParams;

	if (params.get('msgSignSuccessfully')) showSignWindowSuccessfully();

	if (params.get('msgSignError')) showSignWindowError(params.get('msgSignError'));

	if (params.get('msgLoginError')) showLoginUserWindowError(params.get('msgLoginError'));

	if (params.get('msgLoginAdminError')) showLoginWindowError(params.get('msgLoginAdminError'));
};