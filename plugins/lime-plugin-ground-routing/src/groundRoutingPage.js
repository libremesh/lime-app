import { h, Component } from 'preact';

import './style';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { getGroundRouting, setGroundRouting } from './groundRoutingActions';

import I18n from 'i18n-js';

class Page extends Component {

	saveGroundRouting() {
		this.props.setGroundRouting(this.state.config);
	}

	constructor(props) {
		super(props);
		this.state = {
			config: {}
		};
		this.saveGroundRouting = this.saveGroundRouting.bind(this);
	}

	componentWillMount() {
		this.props.getGroundRouting();
	}

	render() {
		return (
			<div class="container" style={{ paddingTop: '100px' }}>
				<h4>{I18n.t('Ground Routing configuration')}</h4>
				<code><pre>{JSON.stringify(this.props.configuration, null, '  ')}</pre></code>
				<button onClick={this.saveGroundRouting}>{I18n.t('Save')}</button>
			</div>
		);
	}
}


const mapStateToProps = (state) => ({
	configuration: state.groundrouting.configuration,
	loading: state.groundrouting.loading,
	hostname: state.meta.selectedHost
});

const mapDispatchToProps = (dispatch) => ({
	getGroundRouting: bindActionCreators(getGroundRouting, dispatch),
	setGroundRouting: bindActionCreators(setGroundRouting, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);