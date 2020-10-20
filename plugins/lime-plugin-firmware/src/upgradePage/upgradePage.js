import { h, Fragment } from 'preact';

import I18n from 'i18n-js';
import style from './style.less';
import { useState } from 'preact/hooks';
import { useForm } from 'react-hook-form';
import Loading from 'components/loading';
import { uploadFile, upgradeFirmware } from '../firmwareApi';
import { useUpgradeInfo, useDownloadRelease, useDownloadStatus, useNewVersion} from '../firmwareQueries';

export const SafeUpgradeBadge = () => {
	const { isLoading, data: upgradeInfo} = useUpgradeInfo();
	if (isLoading) return;

	const isAvailable = upgradeInfo['is_upgrade_confirm_supported'];
	return (
		<div>
			{isAvailable === true &&
				<div class={`${style.note} ${style.notePositive}`}>
					{I18n.t('This device supports secure rollback to previous version if something goes wrong')}
				</div>
			}
			{isAvailable === false &&
				<div class={`${style.note} ${style.noteWarning}`}>
					{I18n.t('This device does not support secure rollback to previous version if something goes wrong')}
				</div>
			}
		</div>
	)
}

const UpgradeFromRelease = ({onUpgrading}) => {
	const [pollingInterval, setPollingInterval] = useState(null);
	const {data: newVersion} = useNewVersion();
	const versionName = newVersion && newVersion.version;
	const {data: downloadStatus} = useDownloadStatus({
		refetchInterval: pollingInterval,
		enabled: versionName,
		onSuccess: data => {
			if (data.download_status === 'downloading') {
				setPollingInterval(1000);
			}
			else {
				setPollingInterval(null);
			}
			return data;
		}
	});

	const [downloadRelease] = useDownloadRelease();
	const filePath = downloadStatus && downloadStatus.fw_path;
	const status = downloadStatus && downloadStatus.download_status;

	function onDownload() {
		downloadRelease()
	}
	
	function onUpgrade() {
		upgradeFirmware(filePath)
			.then(onUpgrading);
	}
	
	if (!versionName) return;

	return (
		<Fragment>
			<div class={`${style.note} ${style.noteCTA}`}>
				<h5>{I18n.t('%{versionName} is now available', { versionName })} 🎉</h5>
				{status === 'not-initiated' &&
					<button onClick={onDownload}>{I18n.t('Download')}</button>
				}
				{status === 'downloading' &&
					<div>
						<div class={style.withLoadingEllipsis}>{I18n.t('Downloading')}</div>
						<button disabled >{I18n.t('Upgrade to %{versionName}', { versionName })}</button>
					</div>
				}
				{status === 'download-failed' &&
					<div>
						<div>{I18n.t('The download failed')}</div>
						<button onClick={onDownload}>{I18n.t('Retry')}</button>
					</div>
				}
				{status === 'downloaded' &&
					<button onClick={onUpgrade}>{I18n.t('Upgrade to %{versionName}', { versionName })}</button>
				}
				{newVersion['release-info-url'] &&
					<div>
						{I18n.t('More info at:')}
						<br /><a href={newVersion['release-info-url']}> {newVersion['release-info-url']} </a>
					</div>
				}
			</div>
			<hr />
		</Fragment>
	)
}

export const UpgradeFromFile = ({onUpgrading}) => {
	const [invalidFirmwareError, setinvalidFirmwareError] = useState(false);
	const {register, handleSubmit, errors, watch, formState } = useForm();
	const file = watch('file');
	const { isSubmitting } = formState;

	function onUpgrade(data) {
		setinvalidFirmwareError(false);
		const file = data.file[0];
		uploadFile(file)
			.then((filepath) => upgradeFirmware(filepath))
			.then(() => onUpgrading())
			.catch(error => {
				switch (error) {
					case 'Invalid Firmware':
						setinvalidFirmwareError(true);
						break;
					default:
						throw new Error(error);
				}
			})
	}

	return (
		<div class={style.sourceSection}>
			<h5><b>{I18n.t('Upload firmware image from your device')}</b></h5>
			<form id="file-upload-form" onSubmit={handleSubmit(onUpgrade)}>
				<label class="button" htmlFor="file">{I18n.t('Select file')}</label>
				<input style={{width: 0}} // Hide the ugly builtin input
					name="file" id="file" type="file" ref={register({required: true})}
				/>
				{file && file.length > 0 &&
					<div>
						<div><b>{I18n.t('Filename')}</b>: {file[0].name}</div>
						<div><b>{I18n.t('Size')}</b>: {(file[0].size / 1048576).toFixed(1)} MB</div>
					</div>
				}
				{errors.file &&
					<p style={{color: "#923838"}}>{I18n.t('Please select a file')}</p>
				}
				<div>
					<button type="submit">{I18n.t('Upgrade')}</button>
				</div>
			</form>
			{isSubmitting &&
				<div>
					<Loading />
				</div>
			}
			{ invalidFirmwareError &&
				<div class={`${style.note} ${style.noteError}`}>
					{I18n.t('The selected image is not a valid for the target device')}
				</div>
			}
		</div>
	)
}


export const UpgradePage = ({onUpgrading}) => (
	<div class="container container-padded">
		<SafeUpgradeBadge />
		<UpgradeFromRelease onUpgrading={onUpgrading} />
		<UpgradeFromFile onUpgrading={onUpgrading} />
	</div>
)
