import { i18n } from "@lingui/core";
import {
    en as enPlurals,
    es as esPlurals,
    pt as ptPlurals,
} from "make-plural/plurals";

export async function dynamicActivate(locale: Locales) {
    let catalog;
    try {
        catalog = await import(`@lingui/loader!../i18n/${locale}/messages.po`);
    } catch (e) {
        // This will fail only during test, due to webpack config, which is expected
        catalog = { messages: {} };
    }

    i18n.load(locale, catalog.messages);
    i18n.activate(locale);
}

i18n.loadLocaleData({
    en: { plurals: enPlurals },
    es: { plurals: esPlurals },
    pt: { plurals: ptPlurals },
});

export default i18n;
