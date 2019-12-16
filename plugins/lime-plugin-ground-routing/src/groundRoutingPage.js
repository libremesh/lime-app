import { h } from 'preact';
import { useEffect } from 'preact/hooks';

import './style';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getGroundRouting } from './groundRoutingActions';

import I18n from 'i18n-js';

const Page = ({ getGroundRouting, loading, configuration }) => {
	
	useEffect(() => {
		getGroundRouting();
	}, []);

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
				{(loading)? 'Loading...' : JSON.stringify(configuration, null, '  ')}
			</pre>
			<button onClick={getGroundRouting}>{I18n.t('Reload')}</button>
			
		</div>
	);
};

const mapStateToProps = (state) => ({
	configuration: state.groundrouting.configuration,
	loading: state.groundrouting.loading
});

const mapDispatchToProps = (dispatch) => ({
	getGroundRouting: bindActionCreators(getGroundRouting, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);