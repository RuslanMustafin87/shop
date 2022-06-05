const menuHaburger = document.getElementById('menu-hamburger');

export function showMenu() {
	menuHaburger.classList.toggle('menu-hamburger--no-close');
}