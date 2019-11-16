import I18n from 'i18n-js';
import { h, Component } from 'preact';
import { Select } from '../../../../src/components/select';

class Renew extends Component {
	handleCheck () {
		console.log('click');
	}
	render() {
		const { submit, goBack } = this.props;
		return (
			<div>
				<Select text={'Juan'} />
				<Select text={'Juan'} />
				<Select text={'Juan'} />
				<Select text={'Juan'} />
				<Select text={'Juan'} />
				<Select text={'Juan'} />
				<Select text={'Juan'} />
				<button class="button green block" onClick={submit}>
					{I18n.t('Renovar')}
				</button>
				<button class="button green block" onClick={goBack}>
					{I18n.t('Cancelar')}
				</button>
			</div>
		);
	}
}

export default Renew;