import { h, createRef } from 'preact';
import I18n from 'i18n-js';
import style from './style.less';
import { useState, useEffect } from 'preact/hooks';

import { upgradeConfirmIsAvailable, uploadFile, validateFirmware, upgradeFirmware } from './firmwareApi';
import { useAppContext } from '../../../src/utils/app.context';

const secureRollbackText = I18n.t(
	'This device supports secure rollback to previous version if something goes wrong');
const noSecureRollbackText = I18n.t(
	'This device does not support secure rollback to previous version if something goes wrong');
const pleaseVerifyImageText = I18n.t(
	'Please verify that the image is for the target device and that you trust its origin');
const validationErrorText = I18n.t(
	'The selected image is not a valid for the target device'
);
const upgradeErrorText = I18n.t(
	'Something wrong happened, not upgrading'
);

const upgradeSuccessTextSameConfig = I18n.t(
	'Wait while the device reboot'
);


export const FirmwarePage = ({
	upgradeConfirmAvailable,
	firmwareIsValid,
	upgradeSuccess,
	onSubmitForm,
	fileInputRef
}) => (
	<div class="container container-padded">
		{upgradeConfirmAvailable === true &&
			<div class={`${style.note} ${style.notePositive}`}>
				{secureRollbackText}
			</div>
		}
		{upgradeConfirmAvailable === false &&
			<div class={`${style.note} ${style.noteWarning}`}>
				{noSecureRollbackText}
			</div>
		}
		<h5>{I18n.t('Upload firmware image from your device')}</h5>
		<form id="file-upload-form" onSubmit={onSubmitForm}>
			<label htmlFor="select-file">{I18n.t('Select file')}</label>
			<input name="select-file" id="select-file" type="file" ref={fileInputRef} />
			<div class={`${style.inputNote} ${style.note}`}>{pleaseVerifyImageText}</div>
			<button type="submit">{I18n.t('Upgrade')}</button>
		</form>
		{ firmwareIsValid === false &&
			<div class={`${style.note} ${style.noteError}`}>
				{validationErrorText}
			</div>
		}
		{ upgradeSuccess === false &&
			<div class={`${style.note} ${style.noteError}`}>
				{upgradeErrorText}
			</div>
		}
		{ upgradeSuccess === true &&
			<div class={`${style.note} ${style.notePositive}`}>
				{upgradeSuccessTextSameConfig}
			</div>
		}
	</div>
);

const FirmwarePageHOC = ({}) => {
	const { uhttpdService } = useAppContext();
	const [upgradeConfirmAvailable, setUpgradeConfirmAvailable] = useState(undefined);
	const [firmwareIsValid, setFirmwareIsValid] = useState(undefined);
	const [upgradeSuccess, setUpgradeSuccess] = useState(undefined);
	const fileInputRef = createRef();

	useEffect(() => {
		upgradeConfirmIsAvailable(uhttpdService)
			.then((isAvailable) => setUpgradeConfirmAvailable(isAvailable));
	}, [uhttpdService]);

	function _validateFirmware() {
		return validateFirmware(uhttpdService)
			.catch(() => Promise.reject('validation'));
	}

	function onSubmitForm(e) {
		e.preventDefault();
		const file = fileInputRef.current.files[0];
		uploadFile(file)
			.then(_validateFirmware)
			.then(() => upgradeFirmware(uhttpdService, false))
			.then(() => setUpgradeSuccess(true))
			.catch(error => {
				switch (error) {
					case 'validation':
						setFirmwareIsValid(false);
						break;
					default:
						setUpgradeSuccess(false);
				}
			})
	}

	function onUpgradeNow() {
		upgradeFirmware(uhttpdService)
	}

	return <FirmwarePage {...{upgradeConfirmAvailable, firmwareIsValid, upgradeSuccess,
		onSubmitForm, onUpgradeNow, fileInputRef}} />
}

export default FirmwarePageHOC;
