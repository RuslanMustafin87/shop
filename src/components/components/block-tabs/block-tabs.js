const blockTabs = document.getElementById('block-tabs-pages');
const blockTabsPages = Array.from(blockTabs.children);

const tabs = Array.from(document.getElementById('tabs').children);

tabs.forEach((tab, index) => {
	tab.onclick = () => {
		blockTabsPages.forEach((page) => page.style.display = 'none');
		blockTabsPages[index].style.display = 'block';
	};
});