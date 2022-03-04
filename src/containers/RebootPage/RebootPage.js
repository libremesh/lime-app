import { h } from 'preact';
import { route } from 'preact-router';
import { Trans } from '@lingui/macro';

import { useReboot, useSetNeedReboot } from 'utils/queries';
import Loading from 'components/loading';

const RebootPage = () => {
	const [ reboot, { isLoading, isSuccess }] = useReboot();
	const [ setNeedReboot ] = useSetNeedReboot();

	function cancel() {
		setNeedReboot('no');
		route('/');
	}


	if (isSuccess) {
		return (
			<div class={`container container-padded container-center`}>
				<h3><Trans>Rebooting</Trans></h3>
				<span><Trans>Please wait while the device reboots, and reload the app</Trans></span>
			</div>
		)
	}

	return (
		<div class={`container container-padded container-center`}>
			<p><Trans>Are you sure you want to reboot?</Trans></p>
			<button onClick={reboot}><Trans>Yes</Trans></button>
			<button onClick={cancel}><Trans>No, cancel</Trans></button>
			{isLoading &&
				<div>
					<Loading />
				</div>
			}
		</div>)
}

export default RebootPage;
