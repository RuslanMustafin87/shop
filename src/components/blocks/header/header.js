import {
	showSignWindow
} from '../../components/mySign/mySign';
import {
	showMenu
} from '../../components/menu/menu';

const buttonSign = document.getElementById('button-sign');
const buttonMenu = document.getElementById('button-menu');

buttonSign.onclick = function(event) {
	event.preventDefault();
	showSignWindow();
};

buttonMenu.onclick = function () {
	this.classList.toggle('header__menu-button--close');
	showMenu();
};