
const genericFile = require('./i18n/generic.json').en;
const translations = require('./i18n');
const colors = require('colors');

const missing = (master, slave) => {
	const slaveKeys = Object.keys(slave);
	return Object.keys(master).filter(key => slaveKeys.indexOf(key)=== -1);
};

const surplus = (master, slave) => {
	const masterKeys = Object.keys(master);
	return Object.keys(slave).filter(key => masterKeys.indexOf(key) === -1);
};

const init = () => {
	console.log(colors.bold.underline('Translations differences'));

	const translationsKeys = Object.keys(translations);

	translationsKeys.forEach((lang) => {
		const translationsMissing = missing(genericFile,translations[lang]);
		const translationsSurplus = surplus(genericFile,translations[lang]);

		console.log(colors.bold('  ./i18n/translations/' + lang + '.json'))
		translationsMissing.map(x => console.log(colors.green('   +++ '+ x)))
		translationsSurplus.map(x => console.log(colors.red('   --- '+ x)))
	});
};

init();