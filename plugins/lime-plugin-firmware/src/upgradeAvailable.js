import { route } from 'preact-router';
import Match from 'preact-router/match';
import I18n from 'i18n-js';
import { Fragment } from 'preact';
import { useNewVersion } from './firmwareQueries';
import Loading from 'components/loading';
import { useBoardData } from 'utils/queries';


export const UpgradeAvailableBanner = () => {
	const {data: newVersion} = useNewVersion();
	const hideReleaseBannerPlease = localStorage.getItem('hideReleaseBannerPlease');

	if (!newVersion || hideReleaseBannerPlease === 'hide') return;

	return (
		<Match>
			{({path}) => !(['firmware', 'releaseInfo'].includes(path.replace('/', ''))) &&
				<div class="subheader-notification" style={{backgroundColor: "#923853", color: "#fff"}}>
					{I18n.t('%{versionName} is now available', { versionName: newVersion.version })}
					<button onClick={() => route('releaseInfo')}>{I18n.t('See More')}</button>
				</div>
			}
		</Match>
	)
}

export const UpgradeAvailabeInfo = () => {
	const { data: boardData } = useBoardData();
	const {data: newVersion, isLoading} = useNewVersion();
	const hideReleaseBannerPlease = localStorage.getItem('hideReleaseBannerPlease');

	if (isLoading) {
		return (
			<div className="container container-center">
				<Loading />
			</div>
		)
	}

	function onNotShowAgain(e) {
		const value = e.target.checked ? 'hide' : 'show';
		localStorage.setItem('hideReleaseBannerPlease', value);
	}

	return (
		<div className="container container-padded">
			<p>
				<h5>{I18n.t('A new firmware version has been released')}</h5>
				{I18n.t('Currently your node has version:')}
				<br />{boardData && boardData.release.description}
				<br />{I18n.t('You can upgrade to:')}
				<br />{newVersion.version}
				{newVersion['realease-info-url'] &&
					<Fragment>
						<br />{I18n.t('More details on the release can be found at:')}
						<br /><a href={newVersion['realease-info-url']}> {newVersion['realease-info-url']} </a>
					</Fragment>
				}
			</p>
			<label>
				<input type="checkbox" name="not-show-again" onInput={onNotShowAgain}
					checked={hideReleaseBannerPlease === 'hide'} />
				{I18n.t("Don't show this message again")}
			</label>
			<div style={{textAlign: "center"}}>
				<button onClick={() => route('firmware')}>{I18n.t('Upgrade Now')}</button>
			</div>
		</div>
	)
}
