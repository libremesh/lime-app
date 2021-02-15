const extend = require('extend');
const I18n = require('i18n-js');
I18n.fallbacks = true;
I18n.locale = navigator.language;
require('i18nline/lib/extensions/i18n_js')(I18n);
require('preact-i18nline/dist/extensions/i18n_js')(I18n);

let translationsTotal = {};

const translationFiles = require.context('../i18n/translations', true, /\.json$/);
translationFiles.keys().forEach((key) => {
	let translation = {};
	translation[key.substring(2).slice(0,-5)] = translationFiles(key);
	extend(true, translationsTotal, translation );
});

extend(true, I18n, { translations: translationsTotal });

window.I18n = I18n;