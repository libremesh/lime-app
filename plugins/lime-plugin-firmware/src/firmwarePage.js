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

const upgradeSuccessTextPreserveConfig = I18n.t(
	'Please wait while the device reboot and reload the app'
);

const upgradeSuccessTextNotPreserveConfig = I18n.t(
	'The device will reboot, you may need to connect to the new wireless network and reload the app'
);


const FirmwareUpgradeSuccess = ({preserveConfig}) => (
	<div class={`container container-padded ${style.upgradeSuccess}`}>
		<h3>
			{I18n.t('The upgrade is done')}
		</h3>
		{ preserveConfig &&
			<span>{upgradeSuccessTextPreserveConfig}</span>
		}
		{!(preserveConfig) &&
			<span>{upgradeSuccessTextNotPreserveConfig}</span>
		}
	</div>
)

export const FirmwarePage = ({
	upgradeConfirmAvailable,
	firmwareIsValid,
	upgradeSuccess,
	preserveConfig,
	tooglePreserveConfig,
	fileInputRef,
	onUpgrade
}) => {
	
	function onSubmitForm(e) {
		e.preventDefault();
		onUpgrade()
	}

	if (upgradeSuccess) {
		return <FirmwareUpgradeSuccess preserveConfig={preserveConfig} />
	}

	return (
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
				<div class={`${style.inputNote} ${style.note}`}>
					<span class={`${style.warningSymbol}`}>⚠</span>
					{pleaseVerifyImageText}
				</div>
				<label>
					<input name="preserve-config" id="preserve-config" type="checkbox" checked={preserveConfig} onChange={tooglePreserveConfig} />
					{I18n.t('Preserve config')}
				</label>
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
		</div>
	);
}

const FirmwarePageHOC = ({}) => {
	const { uhttpdService } = useAppContext();
	const [upgradeConfirmAvailable, setUpgradeConfirmAvailable] = useState(undefined);
	const [firmwareIsValid, setFirmwareIsValid] = useState(undefined);
	const [upgradeSuccess, setUpgradeSuccess] = useState(undefined);
	const [preserveConfig, setpreserveConfig] = useState(false);
	const fileInputRef = createRef();

	useEffect(() => {
		upgradeConfirmIsAvailable(uhttpdService)
			.then((isAvailable) => setUpgradeConfirmAvailable(isAvailable));
	}, [uhttpdService]);

	function _validateFirmware() {
		return validateFirmware(uhttpdService)
			.catch(() => Promise.reject('validation'));
	}

	function tooglePreserveConfig() {
		setpreserveConfig(prevVal => !prevVal);
	}

	function onUpgrade() {
		const file = fileInputRef.current.files[0];
		uploadFile(file)
			.then(_validateFirmware)
			.then(() => upgradeFirmware(uhttpdService, preserveConfig))
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

	return <FirmwarePage {...{upgradeConfirmAvailable, firmwareIsValid, upgradeSuccess,
		preserveConfig, fileInputRef, onUpgrade, tooglePreserveConfig}} />
}

export default FirmwarePageHOC;
