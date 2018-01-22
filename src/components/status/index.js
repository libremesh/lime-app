import { h, Component } from 'preact';
import style from './style';

import I18n from 'i18n-js';

class Status extends Component {
	goBack () {
		this.props.back(this.props.meta.base);
	}
  
	goGeneric () {
		this.props.back('thisnode.info');
	}

	constructor() {
		super();
		this.goBack = this.goBack.bind(this);
		this.goGeneric = this.goGeneric.bind(this);
	}
	render() {
		let isBase = (base,current) => {
			if (base !== current) {
				return (<button class="button green" onClick={this.goBack} translate="yes">Back to base</button>);
			}
			return;
		};
		let isError = (ws, error) => {
			if (typeof error !== 'undefined') {
				return (
					<span>
						<p>{I18n.t('Connection fail',{ meta_ws: this.props.meta.ws.split('/')[2] })}</p>
						<button class="button green" onClick={this.goGeneric} translate="yes">Try thisnode.info</button>
					</span>
				);
			}
			return (<p>{I18n.t('Trying to connect',{ meta_ws: this.props.meta.ws.split('/')[2] })}</p>);
		};
		return (
			<div class={style.center}>
				{isError(this.props.meta.ws.split('/')[2], this.props.meta.error) }
				{isBase(this.props.meta.base,this.props.meta.selectedHost)}
			</div>
		);
	}
}

export default Status;
