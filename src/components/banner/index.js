import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import style from './style';

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
				<h3>{this.props.banner.text}</h3>
				<button onClick={this.onOk}>Ok</button>
				<button onClick={this.onCancel}>Cancel</button>
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
