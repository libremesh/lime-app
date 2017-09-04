import { h, Component } from 'preact';
import style from './style';

class Status extends Component {
	goBack () {
		this.props.back(this.props.meta.base);
	}
  
	constructor() {
		super();
		this.goBack = this.goBack.bind(this);
	}
	render() {
		let isBase = (base,current) => {
			if (base !== current) {
				return (<button class="button green" onClick={this.goBack} translate="yes">Back to base</button>);
			}
			return;
		};
		return (
			<div class={style.center}>
				<p translate="yes">Trying to connect {this.props.meta.ws}</p>
				{isBase(this.props.meta.base,this.props.meta.selectedHost)}
			</div>
		);
	}
}

export default Status;
