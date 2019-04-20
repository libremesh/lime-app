import { h, Component } from 'preact';

import '../style';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { createNetwork } from '../actions';

import I18n from 'i18n-js';

class NetworkForm extends Component {
	_changeName (e){
		this.setState({ communityName: e.target.value || '' });
	}

	_changeHostName (e){
		this.setState({ hostName: e.target.value || '' });
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
			<input type="text" placeholder={I18n.t('Community name')} class="u-full-width" onChange={this._changeName} />
			<label>{I18n.t('Choose a name for this node')}</label>
			<input type="text" placeholder={I18n.t('Host name')} class="u-full-width" value={this.state.hostName} onChange={this._changeHostName} />
			{/* <label>{I18n.t('Choose a password for this node')}</label>
			<input type="text" placeholder={I18n.t('Password')} class="u-full-width" value={this.state.password} onChange={this._changePassword} /> */}
			<div class="row">
				<div class="six columns">
					<button
						class="u-full-width"
						disabled={!this.state.communityName || this.state.communityName === ''}
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
	createNetwork: bindActionCreators(createNetwork ,dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NetworkForm);