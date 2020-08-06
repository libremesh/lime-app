import { h, createRef } from 'preact';
import I18n from 'i18n-js';
import style from './style.less';
import { useState, useEffect } from 'preact/hooks';

import { upgradeConfirmIsAvailable, uploadFile, validateFirmware,
	upgradeFirmware, upgradeConfirm, upgradeRevert} from './firmwareApi';
import { useAppContext } from '../../../src/utils/app.context';
import { route } from 'preact-router';


const secureRollbackText = I18n.t(
	'This device supports secure rollback to previous version if something goes wrong');
const noSecureRollbackText = I18n.t(
	'This device does not support secure rollback to previous version if something goes wrong');
const pleaseVerifyImageText = I18n.t(
	'Please verify that the image is for the target device and that you trust its origin');
const validationErrorText = I18n.t(
	'The selected image is not a valid for the target device'
);

const upgradeSuccessTextPreserveConfig = I18n.t(
	'Please wait while the device reboots and reload the app'
);

const upgradeSuccessTextNotPreserveConfig = I18n.t(
	'The device will reboot, you may need to connect to the new wireless network and reload the app'
);

export const UpgradeConfirm = ({onConfirm, onRevert}) => (
	<div class={`container container-padded container-center`}>
		<button onClick={onConfirm}>{I18n.t('Confirm')}</button>
		<p>{I18n.t('to keep the current configuration. Or ...')}</p>
		<button onClick={onRevert}>{I18n.t('Revert')}</button>
		<p>{I18n.t('to the previous configuration')}</p>
	</div>
);

export const UpgradeReverted = () => (
	<div class={`container container-padded container-center`}>
		<h3>{I18n.t('Reverting to previous version')}</h3>
		<span>{upgradeSuccessTextPreserveConfig}</span>
	</div>
);

const _UpgradeConfirm = () => {
	const { uhttpdService } = useAppContext();
	const [reverted, setReverted] = useState(false);

	function onConfirm() {
		upgradeConfirm(uhttpdService).then(() => {
			route('/');
		})
	}

	function onRevert() {
		upgradeRevert(uhttpdService).then(() => setReverted(true))
	}

	if (reverted) {
		return <UpgradeReverted />
	}

	return <UpgradeConfirm onConfirm={onConfirm} onRevert={onRevert} />
}

export const UpgradeSuccess = ({preserveConfig}) => (
	<div class={`container container-padded container-center`}>
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
);


export const UpgradeForm = ({
	upgradeConfirmAvailable,
	firmwareIsValid,
	preserveConfig,
	tooglePreserveConfig,
	fileInputRef,
	onUpgrade
}) => {
	
	const [filename, setfilename] = useState('');
	const [filesize, setfilesize] = useState(null);

	function onSubmitForm(e) {
		e.preventDefault();
		onUpgrade()
	}

	function onFileChange(e) {
		const files = e.target.files;
		if (files.length > 0) {
			setfilename(files[0].name);
			setfilesize(
				((files[0].size) / 1048576).toFixed(1).toString().concat(' MB')
			)
		}
		else {
			setfilename('');
		}
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
				<label class="button" htmlFor="select-file">{I18n.t('Select file')}</label>
				<input style={{width: 0}} // Hide the ugly builtin input
					name="select-file" id="select-file" type="file" ref={fileInputRef}
					onChange={onFileChange}
				/>
				{filename &&
					<div>
						<div><b>{I18n.t('Filename')}</b>: {filename}</div>
						<div><b>{I18n.t('Size')}</b>: {filesize}</div>
					</div>
				}
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
		</div>
	);
}

const _UpgradeForm = () => {
	const { uhttpdService } = useAppContext();
	const [upgradeConfirmAvailable, setUpgradeConfirmAvailable] = useState(undefined);
	const [firmwareIsValid, setFirmwareIsValid] = useState(undefined);
	const [upgradeSuccess, setUpgradeSuccess] = useState(undefined);
	const [preserveConfig, setpreserveConfig] = useState(false);
	const [fileName, setFilename] = useState('');
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
		setFilename(file.filename);
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
						throw new Error(error);
				}
			})
	}

	if (upgradeSuccess) {
		return <UpgradeSuccess preserveConfig={preserveConfig} />
	}

	return <UpgradeForm {...{upgradeConfirmAvailable, firmwareIsValid,
		preserveConfig, fileInputRef, fileName, onUpgrade, tooglePreserveConfig}} />
}

const FirmwarePage = ({}) => {
	const { suCounter } = useAppContext();
	
	if (suCounter) {
		return <_UpgradeConfirm />
	}

	return <_UpgradeForm />
}

export default FirmwarePage;
