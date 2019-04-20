import { h } from 'preact';
import I18n from 'i18n-js';

const SelectAction = ({ toggleForm }) => (
	<div class="container" style={{ paddingTop: '100px' }}>
		<h4><span>{I18n.t('Configure your network')}</span></h4>
		<p>{I18n.t('You can search for mesh networks around you to add or to create a new one.')}</p>
		<br />
		<div class="row">
			<div class="six columns">
				{/* <button disabled={this.props.status === 'scanning'} onClick={this.searchNetworks} class="u-full-width">
					{ this.props.status === 'scanned' ? I18n.t('Rescan for existent networks') : I18n.t('Scan for existing networks') }
				</button> */}
				<button onClick={toggleForm('scan')} class="u-full-width">
					{I18n.t('Scan for existing networks')}
				</button>
			</div>
			<div class="six columns">
				<button onClick={toggleForm('create')} class="u-full-width">
					{I18n.t('Create new network')}
				</button>
			</div>
		</div>
	</div>
);

export default SelectAction;