import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { adminLogin } from './piraniaActions';
import { authStatus, loading } from './piraniaSelectors';
// import { getSelectedHost } from '../../lime-plugin-core/src/metaSelectors'
import { getNodeData } from '../../lime-plugin-rx/src/rxSelectors';

import Loading from '../../../src/components/loading';
import Home from './pages/home';
import Create from './pages/create';
import Admin from './pages/admin';
import List from './pages/list';
import Renew from './pages/renew';
import Elect from './pages/elect';

import I18n from 'i18n-js';

const style = {
	textLoading: {
		textAlign: 'center',
		display: 'block'
	},
	loadingBox: {
		position: 'fixed',
		marginTop: '30vh',
		zIndex: '5555',
		background: 'rgb(255, 255, 255)',
		width: '200px',
		top: '0px',
		left: 'calc(50% - 100px)',
		borderRadius: '11px',
		padding: '15px',
		boxShadow: '1px 1px 6px rgba(0,0,0,0.5)'
	}
};

export class PiraniaPage extends Component {
	handleHostname (e) {
		this.setState({ hostname: e.target.value });
		return this.state.hostname;
	}

	handleIp (e) {
		this.setState({ ip: e.target.value });
		return this.state.ip;
	}

	handlePassword (e) {
		this.setState({ adminPassword: e.target.value });
		return this.state.adminPassword;
	}

	adminLogin (e) {
		e.preventDefault();
		this.setState({
			logged: true,
			page: 1
		});
		// this.props.adminLogin({
		//   username: 'root',
		//   password: this.state.adminPassword
		// })
	}

	changeConfig (e) {
		e.preventDefault();
		if (typeof this.state.hostname !== 'undefined') {
			return this.props.changeConfig({
				hostname: this.state.hostname,
				ip: this.state.ip
			});
		}
	}

	showLoading (show) {
		if (show) {
			return (
				<div style={style.loadingBox}>
					<Loading />
					<span style={style.textLoading}>
						{I18n.t(
							'Applying changes. The system takes a minute to get back online.'
						)}
					</span>
				</div>
			);
		}
	}

	constructor (props) {
		super(props);
		this.state = {
			// hostname: this.props.selectedHost,
			// ip: this.props.nodeData.ips.filter(ip => ip.version === '4')[0].address,
			logged: false
		};
		this.handlePassword = this.handlePassword.bind(this);
		this.adminLogin = this.adminLogin.bind(this);
	}

	render () {
		const { page, logged } = this.state;
		return (
			<div class="container" style={{ paddingTop: '100px' }}>
				{this.showLoading(this.props.loading)}
				{!logged && (
					<Home
						logged={logged}
						submit={this.adminLogin}
						handlePassword={this.handleHostname}
					/>
				)}
				{page === 1 && (
					<Admin
						list={() => this.setState({ page: 3 })}
						submit={() => this.setState({ page: 2 })}
						renew={() => this.setState({ page: 4 })}
						elect={() => this.setState({ page: 5 })}
						logged={logged}
					/>
				)}
				{page === 2 && (
					<Create
						goBack={() => this.setState({ page: 1 })}
						submit={() => this.setState({ page: 1 })}
						list={() => this.setState({ page: 3 })}
					/>
				)}
				{page === 3 && <List goBack={() => this.setState({ page: 1 })} />}
				{page === 4 && (
					<Renew
						goBack={() => this.setState({ page: 1 })}
						submit={() => this.setState({ page: 1 })}
					/>
				)}
				{page === 5 && (
					<Elect
						goBack={() => this.setState({ page: 1 })}
						submit={() => this.setState({ page: 1 })}
					/>
				)}
			</div>
		);
	}
}

export const mapStateToProps = state => ({
	// selectedHost: getSelectedHost(state),
	nodeData: getNodeData(state),
	authStatus: authStatus(state),
	loading: loading(state)
});

export const mapDispatchToProps = dispatch => ({
	// changeConfig: bindActionCreators(changeConfig, dispatch),
	adminLogin: bindActionCreators(adminLogin, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PiraniaPage);
