import { h } from 'preact';
import { useState } from 'preact/hooks';

import '../style';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { createNetwork } from '../actions';

import I18n from 'i18n-js';
import { isValidHostname, slugify } from '../../../../src/utils/isValidHostname';

export const NetworkForm = ({ createNetwork, toggleForm }) => {
	const [ state, setState ] = useState({
		communityName: '',
		hostName: '',
		password: ''
	});

	function _changeName (e) {
		const end = e.type === 'change';
		e.target.value = slugify(e.target.value.toLocaleLowerCase(), end, true);
		setState({ ...state, communityName: e.target.value || '' });
		return e;
	}

	function _changeHostName (e) {
		const end = e.type === 'change';
		e.target.value = slugify(e.target.value, end);
		setState({ ...state, hostName: e.target.value || '' });
		return e;
	}

	/* function _changePassword (e){
		setState({ ...stat, password: e.target.value || '' });
	} */

	function _createNetwork(){
		createNetwork({ network: state.communityName, hostname: state.hostName });
		toggleForm('setting')();
	}

	return (<div class="container" style={{ paddingTop: '100px' }}>
		<h4><span>{I18n.t('Configure your new community network')}</span></h4>
		<label>{I18n.t('Choose a name for your network')}</label>
		<input type="text" placeholder={I18n.t('Community name')} class="u-full-width" onChange={_changeName} onInput={_changeName} />
		<label>{I18n.t('Choose a name for this node')}</label>
		<input type="text" placeholder={I18n.t('Host name')} class="u-full-width" value={state.hostName} onChange={_changeHostName} onInput={_changeHostName} />
		{/* <label>{I18n.t('Choose a password for this node')}</label>
		<input type="text" placeholder={I18n.t('Password')} class="u-full-width" value={state.password} onChange={_changePassword} /> */}
		<div class="row">
			<div class="six columns">
				<button
					class="u-full-width"
					disabled={!isValidHostname(state.communityName,true) || !isValidHostname(state.hostName, true)}
					onClick={_createNetwork}
				>
					{I18n.t('Create network')}
				</button>
			</div>
			<div class="six columns">
				<button
					class="u-full-width"
					onClick={toggleForm(null)}
				>
					{I18n.t('Cancel')}
				</button>
			</div>
		</div>
	</div>);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
	createNetwork: bindActionCreators(createNetwork ,dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NetworkForm);