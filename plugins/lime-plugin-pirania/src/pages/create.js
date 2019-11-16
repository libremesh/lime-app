import { h, Component } from 'preact';
import style from '../style';
import I18n from 'i18n-js';

class Create extends Component {
	handleInput (e, input) {
		this.setState({ [input]: e.target.value });
	}
	submitForm () {
		if (this.state.voucherQuantity > 1) {
			this.setState({ confirm: true });
		}
 else {
			this.props.list();
		}
	}
	toggleRecurring () {
		this.setState({ recurring: !this.state.recurring });
	}
	constructor (props) {
		super(props);
		this.state = {
			recurring: false,
			code: null,
			notes: '',
			voucherQuantity: 1,
			daysQuantity: 1,
			confirm: null
		};
		this.toggleRecurring = this.toggleRecurring.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}
	render () {
		const { goBack, list } = this.props;
		const {
			code,
			notes,
			voucherQuantity,
			daysQuantity,
			confirm,
			recurring
		} = this.state;
		return (
			<div>
				<form onSubmit={this.submitForm}>
					{!code && !confirm && (
						<div>
							<div class="box">
								<label class="switch">
									<input type="checkbox" onChange={this.toggleRecurring} />
									<span class="slider">
										<span
	style={{
												position: 'relative',
												top: 5,
												left: recurring ? 15 : 60
											}}
										>
											{recurring ? 'Mensual' : 'De un uso'}
										</span>
									</span>
								</label>
							</div>
							{!recurring && (
								<div>
									<div class="box">
										<p>Cantidad de vouchers</p>
										<input
											type="number"
	value={voucherQuantity}
	onChange={e => this.handleInput(e, 'voucherQuantity')}
										/>
									</div>
									<div class="box">
										<p>Cantidad de dias</p>
										<input
											type="number"
											value={daysQuantity}
											onChange={e => this.handleInput(e, 'daysQuantity')}
										/>
									</div>
								</div>
							)}
							<p>
								<label>{I18n.t('Notas')}</label>
								<input
									type="text"
									value={notes}
									onChange={e => this.handleInput(e, 'notes')}
									class="u-full-width"
								/>
							</p>
							<button class="button green block" type="submit" disabled={code}>
								{I18n.t('Criar')}
							</button>
							<button class="button green block" onClick={goBack}>
								{I18n.t('Cancelar')}
							</button>
						</div>
					)}
					{confirm && (
						<div>
							<p>Esta certo que quieres crear {voucherQuantity} vouchers?</p>
							<button class="button green block" onClick={list}>
								{I18n.t('Si')}
							</button>
							<button
								class="button green block"
								onClick={() => this.setState({ confirm: false })}
							>
								{I18n.t('No')}
							</button>
						</div>
					)}
				</form>
			</div>
		);
	}
}

export default Create;
