/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { createMemberVoucher, createVisitorVoucher } from '../piraniaActions';
import { loading, createVoucher } from '../piraniaSelectors';

import I18n from 'i18n-js';
import { Box } from '../../../../src/components/box';
import Loading from '../../../../src/components/loading';

import daysFromNow from '../../../../src/utils/daysFromNow';
import makeid from '../../../../src/utils/makeid';

export function CreatePiraniaPage({ goBack, createMemberVoucher, createVisitorVoucher, createVoucher, loading, createEpoc, list }) {
	const initialNote = '';
	const [voucherQuantity, setVoucherQuantity] = useState(1);
	const [daysQuantity, setDaysQuantity] = useState(1);
	const [note, setNote] = useState(initialNote);
	const [confirm, setConfirm] = useState(false);
	const [member, setMember] = useState(false);

	function handleInput(e, input) {
		setVoucherQuantity;
		if (input === 'voucherQuantity' || input === 'daysQuantity') {
			const number = parseInt(e.target.value, 10);
			if (number > 0) {
				if (input === 'voucherQuantity') setVoucherQuantity(number);
				if (input === 'daysQuantity') setDaysQuantity(number);
			}
		}
		else {
			setNote(e.target.value);
		}
	}
	function addMember() {
		setConfirm(false);
		return createMemberVoucher({
			secret: makeid(8),
			note,
			epoc: `${createEpoc}`
		});
	}
	function addVisitor() {
		setConfirm(false);
		const vouchers = [];
		for (let index = 0; index < voucherQuantity; index++) {
			vouchers.push({
				key: makeid(3),
				voucher: makeid(8),
				epoc: daysFromNow(daysQuantity)
			});
		}
		return createVisitorVoucher({
			note,
			vouchers
		});
	}
	function submitForm(e) {
		e.preventDefault();
		if (voucherQuantity > 2 && !confirm) {
			setConfirm(true);
		}
		else if (member) {
			addMember();
		}
		else {
			addVisitor();
		}
	}
	function toggleMember() {
		setMember(!member);
	}
	return (
		<div>
			<button className="button green block" onClick={goBack}>
				{I18n.t('Go back')}
			</button>
			<Box title={I18n.t('Create new voucher')}>
				<form onSubmit={submitForm}>
					{!confirm && (
						<div className="switchContainer">
							<div className="box" style="display: none;">
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
							{!member && (
								<div className="box">
									<div>
										<label>{I18n.t('Number of vouchers')}</label>
										<input
											className="createInput"
											type="number"
											value={voucherQuantity}
											onChange={e => handleInput(e, 'voucherQuantity')}
										/>
									</div>
									<div>
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
									value={note}
									onChange={e => handleInput(e, 'note')}
									className="nameInput"
								/>
							</p>
							<button className="button green block button-one" type="submit">
								{I18n.t('Create')}
							</button>
							<button className="button green block" onClick={goBack}>
								{I18n.t('Cancel')}
							</button>
						</div>
					)}
					{confirm && (
						<div>
							<p>{I18n.t('Are you sure you want to create')} {voucherQuantity} {I18n.t('vouchers')}?</p>
							<button className="button green block button-one" onClick={addVisitor}>
								{I18n.t('Yes')}
							</button>
							<button
								className="button green block"
								onClick={() => setConfirm(false)}
							>
								{I18n.t('No')}
							</button>
						</div>
					)}
				</form>
				{loading && <Loading />}
			</Box>
			{createVoucher && <button onClick={list}>{I18n.t('Show all vouchers')}</button>}
			{createVoucher && <Box title={I18n.t('Last created')}>
				{!createVoucher.vouchers && <div className="createResult">
					<p><b>{I18n.t('New voucher')}: </b> {createVoucher.secret}</p>
				</div>}
				{createVoucher.vouchers && <div className="createResult">
					<p><b>{I18n.t('New vouchers')}:</b></p>
					{createVoucher.vouchers.map(v => <p key={v}>{v}</p>)}
				</div>}
			</Box>}
		</div>
	);
}

export const mapStateToProps = state => ({
	loading: loading(state),
	createVoucher: createVoucher(state)
});

export const mapDispatchToProps = dispatch => ({
	createMemberVoucher: bindActionCreators(createMemberVoucher, dispatch),
	createVisitorVoucher: bindActionCreators(createVisitorVoucher, dispatch)

});
export default connect(mapStateToProps, mapDispatchToProps)(CreatePiraniaPage);
