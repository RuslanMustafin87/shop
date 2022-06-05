import {
	showMenu
} from '../../components/menu-hamburger/menu-hamburger';

const buttonMenu = document.getElementById('button-menu-hamburger');

buttonMenu.onclick = function() {
	this.classList.toggle('header__menu-button--close');
	showMenu();
};