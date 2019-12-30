import { h } from 'preact';
import { useState } from 'preact/hooks';
import style from '../style';
import I18n from 'i18n-js';
import { Box } from '../../../../src/components/box';

export default function Create ({ list, goBack }) {
	const [ inputs, setInputs] = useState({
		code: null,
		notes: I18n.t('marcos android'),
		voucherQuantity: 1,
		daysQuantity: 1
	});
	const [ confirm, setConfirm ] = useState(false);
	const [ member, setMember ] = useState(false);
	function handleInput (e, input) {
		setInputs(...inputs, { [input]: e.target.value });
	}
	function submitForm () {
		if (inputs.voucherQuantity > 1) {
			setConfirm(true);
		}
		else {
			list();
		}
	}
	function toggleMember () {
		setMember(!member);
	}
	const {
		code,
		notes,
		voucherQuantity,
		daysQuantity
	} = inputs;
	return (
		<div>
			<Box title={I18n.t('Create new voucher')}>
				<form onSubmit={submitForm}>
					{!code && !confirm && (
						<div className="switchContainer">
							<h5>{I18n.t('Voucher type')}</h5>
							<div className="box">
								<label className="switch">
									<input type="checkbox" onChange={toggleMember} />
									<span className="slider">
										<span
											style={{
												position: 'relative',
												top: 5,
												left: member ? 15 : 60
											}}
										>
											{member ? I18n.t('Member') : I18n.t('Visitor')}
										</span>
									</span>
								</label>
							</div>
							<hr />
							{!member && (
								<div className='createSelect'>
									<div className='box'>
										<label>{I18n.t('Number of vouchers')}</label>
										<input
                      className="createInput"
											type="number"
											value={voucherQuantity}
											onChange={e => handleInput(e, 'voucherQuantity')}
										/>
									</div>
									<div className="box">
										<label>{I18n.t('Voucher validity in days')}</label>
										<input
											className="createInput"
											type="number"
											value={daysQuantity}
											onChange={e => handleInput(e, 'daysQuantity')}
										/>
									</div>
								</div>
							)}
              {!member && <hr />}
							<p>
								<label>{I18n.t('User name and device')}</label>
								<input
									type="text"
									value={notes}
									onChange={e => handleInput(e, 'notes')}
									className="nameInput"
								/>
							</p>
							<button className="button green block" className="createButton" type="submit" disabled={code}>
								{I18n.t('Create')}
							</button>
							<button className="button green block" onClick={goBack}>
								{I18n.t('Cancel')}
							</button>
						</div>
					)}
					{confirm && (
						<div>
							<p>Esta certo que quieres crear {voucherQuantity} vouchers?</p>
							<button className="button green block" onClick={list}>
								{I18n.t('Yes')}
							</button>
							<button
								className="button green block"
								onClick={() => setState({ confirm: false })}
							>
								{I18n.t('No')}
							</button>
						</div>
					)}
				</form>
			</Box>
		</div>
	);
}