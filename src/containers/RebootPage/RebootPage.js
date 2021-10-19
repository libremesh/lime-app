import { h } from 'preact';
import { route } from 'preact-router';
import I18n from 'i18n-js';

import { useReboot } from 'utils/queries';
import Loading from 'components/loading';

const RebootPage = () => {
	const [reboot, { isLoading, isSuccess }] = useReboot();

	if (isSuccess) {
		return (
			<div class={`container container-padded container-center`}>
				<h3>{I18n.t('Rebooting')}</h3>
				<span>{I18n.t('Please wait while the device reboots, and reload the app')}</span>
			</div>
		)
	}

	return (
		<div class={`container container-padded container-center`}>
			<p>{I18n.t('Are you sure you want to reboot?')}</p>
			<button onClick={reboot}>{I18n.t('Yes')}</button>
			<button onClick={() => route('/')}>{I18n.t('No, cancel')}</button>
			{isLoading &&
				<div>
					<Loading />
				</div>
			}
		</div>)
}

export default RebootPage;
