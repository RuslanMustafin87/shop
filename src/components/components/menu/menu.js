import Basket from '../myBasket/myBasket';
import {
	showSignWindow
} from '../mySign/mySign';

const menu = document.getElementById('menu');
const buttonMenuSign = document.getElementById('buttonMenuSign');

export function showMenu() {
	menu.classList.toggle('menu--close');
}

buttonMenuSign.onclick = function() {
	showSignWindow();
};