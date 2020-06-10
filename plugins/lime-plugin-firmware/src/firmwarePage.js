import { h, createRef } from 'preact';
import I18n from 'i18n-js';
import './style.less';
import { useState, useEffect } from 'preact/hooks';

import { upgradeConfirmIsAvailable, uploadFile, validateFirmware, upgradeFirmware } from './firmwareApi';

const secureRollbackText = I18n.t(
	'This device supports secure rollback to previous version if something goes wrong');
const noSecureRollbackText = I18n.t(
	'This device does not support secure rollback to previous version if something goes wrong');
const pleaseVerifyImageText = I18n.t(
	'Please verify that the image is for the target device and that you trust its origin');
const validationErrorText = I18n.t(
	'The selected image is not a valid for the target device'
);

const FirmwarePage = ({
	upgradeConfirmAvailable,
	firmwareIsValid,
	onSubmitFileForm,
	onUpgradeNow,
	fileInputRef
}) => (
	<div class="container">
		{upgradeConfirmAvailable === true &&
			<div className="note note-positive">
				{secureRollbackText}
			</div>
		}
		{upgradeConfirmAvailable === false &&
			<div className="note note-warning">
				{noSecureRollbackText}
			</div>
		}
		<span class="section-title">{I18n.t('Upload firmware image from your device')}</span>
		<form id="file-upload-form" onSubmit={onSubmitFileForm}>
			<label>{I18n.t('Select file')}
				<input name="select-file" type="file" ref={fileInputRef} />
			</label>
			<span className="input-note">{pleaseVerifyImageText}</span>
			<button type="submit">{I18n.t('Upload File')}</button>
		</form>
		{firmwareIsValid === false &&
			<div className="note note-error">
				{validationErrorText}
			</div>
		}
		{firmwareIsValid === true &&
			<div>
				<button onClick={onUpgradeNow}>{I18n.t('Upgrade Now')}</button>
			</div>
		}
	</div>
);

const FirmwarePageHOC = ({}) => {
	const [upgradeConfirmAvailable, setUpgradeConfirmAvailable] = useState(undefined);
	const [firmwareIsValid, setFirmwareIsValid] = useState(undefined);
	const fileInputRef = createRef();

	useEffect(() => {
		upgradeConfirmIsAvailable()
			.then((isAvailable) => setUpgradeConfirmAvailable(isAvailable));
	}, []);

	function onSubmitFileForm(e) {
		e.preventDefault();
		const file = fileInputRef.current.files[0];
		uploadFile(file)
			.then(() => validateFirmware())
			.then(isValid => setFirmwareIsValid(isValid))
	}

	function onUpgradeNow() {
		upgradeFirmware()
	}

	return <FirmwarePage {...{upgradeConfirmAvailable, firmwareIsValid,
		onSubmitFileForm, onUpgradeNow, fileInputRef}} />
}

export default FirmwarePageHOC;
