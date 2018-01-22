import { h, Component } from 'preact';

import style from './style';

class Alert extends Component {
	
	getStyle(status) {
		return status? {}: { bottom: '-50px', opacity: '0' };
	}

	render() {
		return (
			<div style={this.getStyle(this.props.text)} class={style.toast} onClick={this.props.hide}>
				<div style={{ padding: '10px',color: '#fff' }}>
					{this.props.text}
				</div>
			</div>
		);
	}
}

export default Alert;