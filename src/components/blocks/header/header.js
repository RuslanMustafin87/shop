import {
	showSignWindow
} from '../../components/mySign/mySign';
import {
	showMenu
} from '../../components/menu/menu';
import {
	showLoginUserWindow
} from '../../components/loginUser/loginUser';

const buttonSign = document.getElementById('button-sign');
const buttonLoginUser = document.getElementById('button-login');
const buttonMenu = document.getElementById('button-menu');

// eslint-disable-next-line curly
if (buttonSign) {
	buttonSign.onclick = function(event) {
		event.preventDefault();
		showSignWindow();
	};
}

// eslint-disable-next-line curly
if (buttonLoginUser) {
	buttonLoginUser.onclick = function(event) {
		event.preventDefault();
		showLoginUserWindow();
	};
}

buttonMenu.onclick = function() {
	this.classList.toggle('header__menu-button--close');
	showMenu();
};