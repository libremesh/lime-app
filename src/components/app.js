import { h } from 'preact';
import Router from 'preact-router';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import store from '../store';
import { history } from '../store/history';

import { Header } from './header';
import Alert from './alert';
import Status from './status';
import { plugins } from '../config';
import Banner from './banner';
import { isBanner } from '../../plugins/lime-plugin-rx/src/rxSelectors';
import { useEffect } from 'preact/hooks';
import { Navs } from '../routes';
import { Drawer } from './drawer';

const goBase = (hostname) => ({
	type: 'meta/CONECTION_CHANGE_URL',
	payload: 'http://thisnode.info/ubus'
});


const hideAlert = () => ({
	type: 'NOTIFICATION_HIDE'
});

const changeNode = (hostname) => {
	window.location.href = 'http://' + hostname;
	return {
		type: '__CHANGE_NODE',
		payload: hostname
	};
};

function appIsConnected(meta) {
	/** Return true if the LimeApp is connected to a LibreMesh node */
	return (meta.sid !== '00000000000000000000000000000000' && meta.stauts !== 'start')
}

const ChangeNode = ({ change, hostname }) => {
	/** Utility Element to setup changeNode/:hostname url route */
	useEffect(() => {
		change(hostname);
	}, []);
};

const Content = ({ history, plugins, isBanner, meta, goBase, changeNode }) => {
	if (isBanner) {
		return <Banner></Banner>
	}
	if (!appIsConnected(meta)) {
		return <Status meta={meta} back={goBase} />
	}
	return (
		<Router history={history}>
			<ChangeNode path="/changeNode/:hostname" change={changeNode} />
			{plugins
				.filter(plugin => plugin.page !== false)
				.map(Component => (<Component.page path={Component.name.toLowerCase()} />))
			}
		</Router>
	)
}

const App = ({ meta, history, changeNode, goBase, isBanner }) => {
	return (
		<div>
			<Header
				hostname={meta.selectedHost}
				goHome={goBase}
				menuHidden={meta.menuHidden}
				Drawer={Drawer}
				Navs={Navs}
			/>
			<Content history={history} plugins={plugins} isBanner={isBanner} meta={meta}
				goBase={goBase} changeNode={changeNode} />
			<Alert text={meta.alert} hide={hideAlert} />
		</div>
	);
};

const mapStateToProps = (state) => ({
	meta: state.meta,
	isBanner: isBanner(state)
});

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
