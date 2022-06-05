let menuNav = document.getElementById('menu-nav');

if (document.documentElement.clientWidth <= 960) menuNav.remove();

import {
	showSignWindow
} from '../sign-user/sign-user';
import {
	showLoginUserWindow
} from '../../components/loginUser/loginUser';

const buttonSign = document.getElementById('button-sign');
const buttonLoginUser = document.getElementById('button-login');

if (buttonSign) buttonSign.onclick = () => showSignWindow();

if (buttonLoginUser) buttonLoginUser.onclick = () => showLoginUserWindow();