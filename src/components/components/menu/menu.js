import {
	showSignWindow
} from '../mySign/mySign';
import {
	showLoginUserWindow
} from '../../components/loginUser/loginUser';

const menu = document.getElementById('menu');
const buttonMenuSign = document.getElementById('buttonMenuSign');
const buttonMenuLoginUser = document.getElementById('buttonMenuLogin');

export function showMenu() {
	menu.classList.toggle('menu--no-close');
}

buttonMenuSign.onclick = () => showSignWindow();

buttonMenuLoginUser.onclick = () => showLoginUserWindow();