import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import style from './style';
import I18n from 'i18n-js';
class Banner extends Component {

	onOk(){
		this.props.send(this.props.banner.onOk);
	}

	onCancel(){
		this.props.send(this.props.banner.onCancel);
	}

	constructor(props) {
		super(props);
		this.onCancel = this.onCancel.bind(this);
		this.onOk = this.onOk.bind(this);
	}

	render() {
		return (this.props.banner !== false)? (
			<div className={style.banner} style={{
				padding: '20px 10px',
				position: 'fixed',
				top: '56px',
				height: '100%',
				width: '100%',
				background: '#54716a',
				color: '#fff',
				fontWeight: 'bold',
				zIndex: 999,
				textAlign: 'center'
			}}
			>
				<h3>{this.props.banner.title}</h3>
				{this.props.banner.description? <p style={{ maxWidth: '400px', margin: '20px auto' }}>{this.props.banner.description}</p>: false}
				<button onClick={this.onOk}>{I18n.t('Ok')}</button>
				<button onClick={this.onCancel}>{I18n.t('Cancel')}</button>
			</div>
		): false;
	}
}

export default connect(
	(state) => ({
		banner: state.meta.banner || false
	}),
	(dispatch) => ({
		send: (action) => dispatch(action)
	})
)(Banner);
