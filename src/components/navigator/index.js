import { h, Component } from 'preact';
import style from './style';

class Navigator extends Component {
	notInBase(meta){
		if (meta.selectedHost !== meta.base && meta.sid !== '00000000000000000000000000000000' && meta.stauts !== 'start') {
			return 'transform: translate(0,0)';
		}
		return 'transform: translate(0,-100px)';
	}

	render() {
		return (
			<div class={style.navigation} style={this.notInBase(this.props.hostname)}>
				<h4>{this.props.hostname.selectedHost}</h4>
				<button onClick={this.props.goHome} >X</button>
			</div>
		);
	}
}

export default Navigator;
