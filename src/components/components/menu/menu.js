const menuButton = document.getElementById('menu-button');

menuButton.onclick = function() {
	this.classList.toggle('header__menu--close');
};