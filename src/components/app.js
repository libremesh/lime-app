import { h } from 'preact';
import Router from 'preact-router';

import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import store, { initStore } from '../store';
import { history } from '../store/history';

import style from './style';


import { Header } from './header';
import Alert from './alert';
import Status from './status';
import { plugins } from '../config';
import Banner from './banner';
import { isBanner } from '../../plugins/lime-plugin-rx/src/rxSelectors';
import { useEffect } from 'preact/hooks';

initStore();

const ChangeNode = ({ change, hostname }) => {
	useEffect(() => {
		change(hostname);
	}, []);
};


//class App extends Component {
const App = ({ meta, history, changeNode, goBase, isBanner }) => {

	function isConnected(meta) {
		if (meta.sid !== '00000000000000000000000000000000' && meta.stauts !== 'start' ) {
			return (
				<div class={style.wraper}>
					<Router history={history}>
						<ChangeNode path="/changeNode/:hostname" change={changeNode} />
						{plugins
							.filter(plugin => plugin.page !== false)
							.map(Component => (<Component.page path={Component.name.toLowerCase()} />))
						}
					</Router>
				</div>
			);
		}
		return (
			<div class={style.wraper}>
				<Router history={history} />
				<Status meta={meta} back={goBase} />
			</div>
		);
	}
    
	/* Ignore for now */
	function isBase(meta) {
		if (meta.selectedHost !== meta.base && meta.sid !== 'no_user' && meta.stauts !== 'start') {
			return { minWidth: '100%' };
		}
		return { minWidth: '100%' };
	}
    
	return (
		<div style={isBase(meta)}>
			<Banner />
			<Header hostname={meta.selectedHost} goHome={goBase} menuHidden={meta.menuHidden} />
			{ /*<Navigator hostname={meta} goHome={goBase} /> */ }
			{!isBanner && isConnected(meta)}
			<Alert text={meta.alert} hide={hideAlert} />
		</div>
	);
};

const mapStateToProps = (state) => ({
	meta: state.meta,
	isBanner: isBanner(state)
});

const goBase = (hostname) => ({
	type: 'meta/CONECTION_CHANGE_URL',
	payload: 'http://thisnode.info/ubus'
});


const hideAlert = () => ({
	type: 'NOTIFICATION_HIDE'
});

const changeNode = (hostname) => {
	window.location.href = 'http://'+hostname;
	return {
		type: '__CHANGE_NODE',
		payload: hostname
	};
};

const mapDispatchToProps = (dispatch) => ({
	goBase: bindActionCreators(goBase, dispatch),
	changeNode: bindActionCreators(changeNode, dispatch),
	hideAlert: bindActionCreators(hideAlert, dispatch)
});


const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App);

export const AppDefault = () => (
	<Provider store={store}>
		<AppConnected history={history} />
	</Provider>
);