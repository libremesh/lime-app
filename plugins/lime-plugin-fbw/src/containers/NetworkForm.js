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

	createNetwork(){
		this.props.createNetwork({ name: this.state.communityName });
		this.toggleForm(null)();
	}

	constructor(props){
		super(props);
		this.createNetwork = this.createNetwork.bind(this);
		this._changeName = this._changeName.bind(this);
	}

	render() {
		return (<div>
			<h4><span>{I18n.t('Configure your new community network')}</span></h4>
			<input type="text" placeholder={I18n.t('Community name')} class="u-full-width" onChange={this._changeName} />
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