import { h, Component } from 'preact';
import style from './style';

export class Drawer extends Component {

	status(open) {
		if (open) {
			return 'transform: translate(0,0)';
		}
		return 'transform: translate(-100vw,0)';
	}

	render() {
		return (
			<div class={style.drawer} style={this.status(this.props.status)} onClick={this.props.toggle}>
				{(this.props.children)}
			</div>
		);
	}
}