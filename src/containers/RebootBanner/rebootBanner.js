import { h } from "preact";
import I18n from "i18n-js";
import { route } from "preact-router";
import { Match } from 'preact-router/match';

export const RebootBanner = () => (
    <Match>
        {({ path }) => (path !== '/reboot') &&
            <div data-testid='changes-need-reboot'
                class="subheader-notification" style={{ backgroundColor: "#f7a336" }}>
                {I18n.t('A reboot is needed to apply changes')}
                <button onClick={() => route('/reboot')}>{I18n.t('Reboot')}</button>
            </div>
        }
    </Match>
);
