import { h, Component } from 'preact';
import Router from 'preact-router';

import style from './style';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import Header from '../components/header';
import Alert from '../components/alert';
import Status from '../components/status';
import { plugins } from '../config';
import Banner from '../components/banner';

class ChangeNode extends Component {
	componentWillMount () {
		this.props.change(this.props.hostname);
	}
}


class App extends Component {
	bannerOk = function() { this.props.sendAction(this.props.meta.banner.onOK); }.bind(this);
	bannerCancel = function() { this.props.sendAction(this.props.meta.banner.onCancel); }.bind(this);

	render({ store,history }) {
		const isConnected = (meta) => {
			if (meta.sid !== '00000000000000000000000000000000' && meta.stauts !== 'start' ) {
				return (
					<div class={style.wraper}>
						<Router history={history}>
							<ChangeNode path="/changeNode/:hostname" change={this.props.changeNode} />
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
					<Status meta={meta} back={this.props.goBase} />
				</div>
			);
		};
    
		/* Ignore for now */
		const isBase = (meta) => {
			if (meta.selectedHost !== meta.base && meta.sid !== 'no_user' && meta.stauts !== 'start') {
				return { minWidth: '100%' };
			}
			return { minWidth: '100%' };
		};
    
		return (
			<div style={isBase(this.props.meta)}>
				<Banner />
				<Header hostname={this.props.meta.selectedHost} goHome={this.props.goBase} />
				{ /*<Navigator hostname={this.props.meta} goHome={this.props.goBase} /> */ }
				{isConnected(this.props.meta)}
				<Alert text={this.props.meta.alert} hide={this.props.hideAlert} />
			</div>
		);
	}
}


const mapStateToProps = (state) => ({ meta: state.meta });

const goBase = (hostname) => (dispatch) => {
	dispatch({
		type: 'meta/CONECTION_CHANGE_URL',
		payload: 'http://thisnode.info/ubus'
	});
};

const hideAlert = () => (dispatch) => {
	dispatch({
		type: 'NOTIFICATION_HIDE'
	});
};

const changeNode = (hostname) => (dispatch) => {
	dispatch({
		type: 'meta/CONECTION_CHANGE_URL',
		payload: 'http://'+ hostname +'/ubus'
	});
	dispatch({
		type: 'meta/CONECTION_CHANGE_CURRENT_BASE',
		payload: hostname
	});
};

const mapDispatchToProps = (dispatch) => ({
	goBase: bindActionCreators(goBase, dispatch),
	changeNode: bindActionCreators(changeNode, dispatch),
	hideAlert: bindActionCreators(hideAlert, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(App);