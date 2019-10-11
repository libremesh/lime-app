import { h, Component } from 'preact';

import '../style';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { createNetwork } from '../actions';

import I18n from 'i18n-js';
import { isValidHostname, slugify } from '../../../../src/utils/isValidHostname';
import { showNotification } from '../../../../src/store/actions';

class NetworkForm extends Component {
	_changeName (e){
		const end = e.type === 'change';
		e.target.value = slugify(e.target.value, end, true);
		this.setState({ communityName: e.target.value || '' });
		return e;
	}

	_changeHostName (e){
		const end = e.type === 'change';
		e.target.value = slugify(e.target.value, end);
		this.setState({ hostName: e.target.value || '' });
		return e;
	}

	_changePassword (e){
		this.setState({ password: e.target.value || '' });
	}

	createNetwork(){
		this.props.createNetwork({ network: this.state.communityName, hostname: this.state.hostName });
		this.props.toggleForm('setting')();
	}

	constructor(props){
		super(props);
		this.createNetwork = this.createNetwork.bind(this);
		this._changeName = this._changeName.bind(this);
		this._changeHostName = this._changeHostName.bind(this);
		this._changePassword = this._changePassword.bind(this);
	}

	render() {
		return (<div class="container" style={{ paddingTop: '100px' }}>
			<h4><span>{I18n.t('Configure your new community network')}</span></h4>
			<label>{I18n.t('Choose a name for your network')}</label>
			<input type="text" placeholder={I18n.t('Community name')} class="u-full-width" onChange={this._changeName} onInput={this._changeName} />
			<label>{I18n.t('Choose a name for this node')}</label>
			<input type="text" placeholder={I18n.t('Host name')} class="u-full-width" value={this.state.hostName} onChange={this._changeHostName} onInput={this._changeHostName} />
			{/* <label>{I18n.t('Choose a password for this node')}</label>
			<input type="text" placeholder={I18n.t('Password')} class="u-full-width" value={this.state.password} onChange={this._changePassword} /> */}
			<div class="row">
				<div class="six columns">
					<button
						class="u-full-width"
						disabled={!isValidHostname(this.state.communityName,true) || !isValidHostname(this.state.hostName, true)}
						onClick={this.createNetwork}
					>
						{I18n.t('Create network')}
					</button>
				</div>
				<div class="six columns">
					<button
						class="u-full-width"
						onClick={this.props.toggleForm(null)}
					>
						{I18n.t('Cancel')}
					</button>
				</div>
			</div>
		</div>);
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
	showNotification: bindActionCreators(showNotification, dispatch),
	createNetwork: bindActionCreators(createNetwork ,dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NetworkForm);