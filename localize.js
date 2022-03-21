(function (exports) {
	window.localization = exports();
})(function () {
	const localization = {};
	localization.allLocales = {
		'en': 'English',
		'nan': '臺語'
	};
	localization.translations = {
		'nan': {
			'Language': '語言'
		}
	};
	localization.currentLocale = (new URL(location)).searchParams.get('hl') || localStorage.getItem('locale');
	if (!localization.currentLocale) {
		localization.currentLocale = 'en';
		localStorage.setItem('locale', 'en'); 
	}
	if (!localization.allLocales[localization.currentLocale]) localization.currentLocale = 'en';
	console.log(localization.currentLocale)
	localization.hideLocale = locale => document.querySelector(`div.lang-container[lang="${locale}"]`).style.display = 'none';
	localization.showLocale = locale => document.querySelector(`div.lang-container[lang="${locale}"]`).style.display = 'block';
	localization.switchToLocale = locale => {
		const oldLocale = localization.currentLocale;
		localization.currentLocale = locale;
		localStorage.setItem('locale', locale);
		localization.hideLocale(oldLocale);
		localization.showLocale(locale);
	};
	localization.getString = (str, lang = localization.currentLocale) => localization.translations[lang]?.[str] || str; //fallback for english or nonexistent languages
	for (const [code] of Object.entries(localization.allLocales)) {
		console.log(code)
		localization.hideLocale(code);
	}
	localization.showLocale(localization.currentLocale);
	//create the menu
	document.body.appendChild(document.createElement('br'));
	const div = document.createElement('div');
	div.id = 'language-selection';
	const label = document.createElement('label');
	label.textContent = localization.getString('Language') + ': ';
	label.htmlFor = 'language-menu';
	div.appendChild(label);
	const menu = document.createElement('select');
	menu.id = 'language-menu';
	localization.menu = menu; 
	for (const [code, name] of Object.entries(localization.allLocales)) {
		const item = document.createElement('option');
		item.value = code;
		item.label = name;
		console.log(code, localization.currentLocale);
		item.selected = code === localization.currentLocale;
		menu.add(item);
	}
	menu.addEventListener('change', event => {
		localization.switchToLocale(menu.selectedOptions[0].value);
		label.textContent = localization.getString('Language') + ': ';
	});
	div.appendChild(menu);
	document.body.appendChild(div);
	return localization;
});