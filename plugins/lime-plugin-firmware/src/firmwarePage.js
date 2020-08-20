import { h, createRef } from 'preact';
import I18n from 'i18n-js';
import style from './style.less';
import { useState, useEffect } from 'preact/hooks';

import { upgradeConfirmIsAvailable, uploadFile, validateFirmware,
	upgradeFirmware, upgradeConfirm, upgradeRevert} from './firmwareApi';
import { useAppContext } from '../../../src/utils/app.context';
import ProgressBar from '../../../src/components/progressbar';
import Loading from '../../../src/components/loading';
import { route } from 'preact-router';

const afterUpgradeNotPreserveConfigText = I18n.t('You may need to connect to the new wireless network and reload the app');

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
		<span>{I18n.t('Please wait while the device reboots, and reload the app')}</span>
	</div>
);

const _UpgradeConfirm = () => {
	const { uhttpdService, stopSuCounter } = useAppContext();
	const [reverted, setReverted] = useState(false);

	function onConfirm() {
		upgradeConfirm(uhttpdService).then(() => {
			stopSuCounter();
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

export const UpgradeSuccess = ({ preserveConfig, onReload } ) => (
	<div class="container container-padded container-center">
		<h3>
			{I18n.t('The upgrade should be done')}
		</h3>
		{preserveConfig &&
			<button onClick={onReload}>{I18n.t('Try reloading the app')}</button>
		}
		{!(preserveConfig) &&
			<span>{afterUpgradeNotPreserveConfigText}</span>
		}
	</div>
)
export const UpgradeProgress = ({elapsedTime, totalTime}) => {
	const remainingTime = totalTime - elapsedTime;
	const progress = elapsedTime / totalTime * 100;
	return (
		<div class="container container-padded container-center">
			<h3>
				{I18n.t('The firmware is being upgraded...')}
			</h3>
			<ProgressBar progress={progress} />
			<span>{I18n.t('Please wait patiently for %{seconds} seconds and do not disconnect the device.', {seconds: remainingTime})}</span>
		</div>
	)
};

const _UpgradeSubmitted = ({ preserveConfig }) => {
	const totalTime = 180;
	const [elapsedTime, setElapsedTime] = useState(0);

	useEffect(() => {
		const id = setInterval(() => setElapsedTime(elapsedTime => elapsedTime + 1), 1000)
		return () => {
			clearInterval(id);
		}
	}, [elapsedTime, setElapsedTime])


	function onReload() {
		window.location = window.origin;
	}

	if (elapsedTime < totalTime) {
		return <UpgradeProgress elapsedTime={elapsedTime} totalTime={totalTime} />
	}

	return <UpgradeSuccess preserveConfig={preserveConfig} onReload={onReload} />
}

export const UpgradeForm = ({
	upgradeConfirmAvailable=true,
	firmwareIsValid,
	preserveConfig=true,
	tooglePreserveConfig,
	fileInputRef,
	onUpgrade,
	submitting
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
			setfilesize(files[0].size);
		}
		else {
			setfilename('');
		}
	}

	return (
		<div class="container container-padded">
			{upgradeConfirmAvailable === true &&
				<div class={`${style.note} ${style.notePositive}`}>
					{I18n.t('This device supports secure rollback to previous version if something goes wrong')}
				</div>
			}
			{upgradeConfirmAvailable === false &&
				<div class={`${style.note} ${style.noteWarning}`}>
					{I18n.t('This device does not support secure rollback to previous version if something goes wrong')}
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
						<div><b>{I18n.t('Size')}</b>: {(filesize / 1048576).toFixed(1)} MB</div>
					</div>
				}
				<label>
					<input name="preserve-config" id="preserve-config" type="checkbox" checked={preserveConfig} onChange={tooglePreserveConfig} />
					{I18n.t('Preserve config')}
				</label>
				<button type="submit">{I18n.t('Upgrade')}</button>
			</form>
			{submitting &&
				<div>
					<Loading />
				</div>
			}
			{ firmwareIsValid === false &&
				<div class={`${style.note} ${style.noteError}`}>
					{I18n.t('The selected image is not a valid for the target device')}
				</div>
			}
		</div>
	);
}

const _UpgradeForm = () => {
	const { uhttpdService } = useAppContext();
	const [upgradeConfirmAvailable, setUpgradeConfirmAvailable] = useState(undefined);
	const [firmwareIsValid, setFirmwareIsValid] = useState(undefined);
	const [submitSuccess, setSubmitSucces] = useState(undefined);
	const [preserveConfig, setpreserveConfig] = useState(true);
	const [submitting, setSubmitting] = useState(false);
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
		setSubmitting(true);
		const file = fileInputRef.current.files[0];
		setFilename(file.filename);
		uploadFile(uhttpdService, file)
			.then(_validateFirmware)
			.then(() => upgradeFirmware(uhttpdService, preserveConfig))
			.then(() => setSubmitSucces(true))
			.catch(error => {
				switch (error) {
					case 'validation':
						setFirmwareIsValid(false);
						break;
					default:
						throw new Error(error);
				}
			})
			.finally(setSubmitting(false))
	}

	if (submitSuccess) {
		return <_UpgradeSubmitted preserveConfig={preserveConfig} />
	}

	return <UpgradeForm {...{upgradeConfirmAvailable, firmwareIsValid,
		preserveConfig, fileInputRef, fileName, onUpgrade, tooglePreserveConfig, submitting}} />
}

const FirmwarePage = ({}) => {
	const { suCounter } = useAppContext();
	
	if (suCounter > 0) {
		return <_UpgradeConfirm />
	}

	return <_UpgradeForm />
}

export default FirmwarePage;
