import { h } from "preact";
import { route } from "preact-router";
import { Match } from 'preact-router/match';
import { Trans } from '@lingui/macro';

export const RebootBanner = () => (
    <Match>
        {({ path }) => (path !== '/reboot') &&
            <div data-testid='changes-need-reboot'
                class="subheader-notification" style={{ backgroundColor: "#f7a336" }}>
                <Trans>A reboot is needed to apply changes</Trans>
                <button onClick={() => route('/reboot')}><Trans>Reboot</Trans></button>
            </div>
        }
    </Match>
);
