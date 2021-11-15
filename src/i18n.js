import { i18n } from '@lingui/core';
import { messages as enMsgs } from '../i18n/en/messages';
import { messages as esMsgs } from '../i18n/es/messages';
import { messages as ptMsgs } from '../i18n/pt/messages';
import {
    en as enPlurals,
    es as esPlurals,
    pt as ptPlurals
} from 'make-plural/plurals';
import { fromNavigator } from '@lingui/detect-locale';

window.i18n = i18n;
i18n.load('en', enMsgs);
i18n.load('es', esMsgs);
i18n.load('pt', ptMsgs);
i18n.loadLocaleData({
    en: { plurals: enPlurals },
    es: { plurals: esPlurals },
    pt: { plurals: ptPlurals }
});


i18n.activate(fromNavigator().split('-')[0]);

export default i18n;
