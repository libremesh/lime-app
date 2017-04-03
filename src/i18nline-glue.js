const extend = require('extend');
const I18n = require("i18n-js");
I18n.locale = navigator.languages[0];
require("i18nline/lib/extensions/i18n_js")(I18n);
require("preact-i18nline/dist/extensions/i18n_js")(I18n);

const translationFiles = require.context("../i18n/translations", true, /\.json$/);
translationFiles.keys().forEach((key) => {
  extend(true, I18n, {translations: translationFiles(key)});
});

window.I18n = I18n;