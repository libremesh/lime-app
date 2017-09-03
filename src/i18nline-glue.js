const extend = require('extend');
const I18n = require('i18n-js');
I18n.locale = navigator.language.split('-')[0];
require('i18nline/lib/extensions/i18n_js')(I18n);
require('preact-i18nline/dist/extensions/i18n_js')(I18n);

import { loadTranslations } from './utils/loader';
import { plugins } from './config';

let translationsTotal = {};

const translationPlugins = loadTranslations(plugins);
translationPlugins.forEach(plugin => {
	extend(true, translationsTotal, plugin);
});

const translationFiles = require.context('../i18n/translations', true, /\.json$/);
translationFiles.keys().forEach((key) => {
	extend(true, translationsTotal, translationFiles(key));
});

extend(true, I18n, { translations: translationsTotal });

window.I18n = I18n;