import {
	showLoginWindowError
} from '../components/components/myLogin/mylogin';
import {
	showSignWindowError
} from '../components/components/mySign/mySign';


window.onload = function() {

	let params = (new URL(document.location.href)).searchParams;

	if (params.get('msgLogin')) showLoginWindowError(params.get('msgLogin'));

	if (params.get('msgSign')) showSignWindowError(params.get('msgSign'));
};