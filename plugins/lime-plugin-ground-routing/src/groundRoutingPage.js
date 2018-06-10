import { h, Component } from 'preact';

import './style';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { getGroundRouting } from './groundRoutingActions';

import I18n from 'i18n-js';

class Page extends Component {

	constructor(props) {
		super(props);
		this.state = {
			config: {}
		};
	}

	componentWillMount() {
		this.props.getGroundRouting();
	}

	render() {
		const preStyle = {
			backgroundColor: '#f5f5f5',
			borderRadius: '4px',
			padding: '15px',
			border: '1px solid #ccc'
		};

		return (
			<div class="container" style={{ paddingTop: '100px' }}>
				<h4>{I18n.t('Ground Routing configuration')}</h4>
				<pre style={preStyle}>
					{(this.props.loading)? 'Loading...' : JSON.stringify(this.props.configuration, null, '  ')}
				</pre>
				<button onClick={this.props.getGroundRouting}>{I18n.t('Reload')}</button>
				
			</div>
		);
	}
}


const mapStateToProps = (state) => ({
	configuration: state.groundrouting.configuration,
	loading: state.groundrouting.loading
});

const mapDispatchToProps = (dispatch) => ({
	getGroundRouting: bindActionCreators(getGroundRouting, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);