
import { Trans } from '@lingui/macro';

export const SelectAction = ({ toggleForm }) => (
	<div class="container container-padded">
		<h4><span><Trans>Configure your network</Trans></span></h4>
		<p><Trans>You can search for mesh networks around you to add or to create a new one.</Trans></p>
		<br />
		<div class="row">
			<div class="six columns">
				<button onClick={toggleForm('scan')} class="u-full-width">
					<Trans>Scan for existing networks</Trans>
				</button>
			</div>
			<div class="six columns">
				<button onClick={toggleForm('create')} class="u-full-width">
					<Trans>Create new network</Trans>
				</button>
			</div>
		</div>
	</div>
);

export default SelectAction;
