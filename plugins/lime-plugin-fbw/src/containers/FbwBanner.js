import { BannerWithOptions } from 'components/banner/banner_with_options';
import { BannerOptionButton, BannerOptionCancelButton } from 'components/banner/banner_options_btns';
import { useState } from 'preact/hooks';
import { Trans } from '@lingui/macro';
import { useDismissFbw } from '../FbwQueries';
import { route } from 'preact-router';
import { useAppContext } from 'utils/app.context';

export const FbwBanner = ({ toggleForm }) => {
	const [notShowAgain, setnotShowAgain] = useState(false);
	const { mutate: dismissFbw } = useDismissFbw();
	const { cancelFbw } = useAppContext();

	const fbwRoute = 'firstbootwizard'
	const createRoute = 'create';
	const scanRoute = 'scan';

	function onCreateNetwork() {
		toggleForm != null ? toggleForm(createRoute)() 
		: route(`${fbwRoute}/${createRoute}`)
	}

	function onSearchNetwork() {
		toggleForm != null ? toggleForm(scanRoute)()
		: route(`${fbwRoute}/${scanRoute}`)
	}

	function onCancel() {
		if (notShowAgain) {
			dismissFbw().then(
				() => cancelFbw());
		}
		else {
			cancelFbw();
		}
		
		if(toggleForm != null) route('/')
	}

	function onNotShowAgain(e) {
		setnotShowAgain(e.target.checked);
	}

	const title = <Trans>Welcome to LimeApp</Trans>;

	const option1 = <BannerOptionButton 
		btnText={<Trans>Create network</Trans>} 
		description={<Trans>If this is your network first node, you can create a new network</Trans>}
		action={onCreateNetwork}
	/>

	const option2 = <BannerOptionButton 
		btnText={<Trans>Search network</Trans>} 
		description={<Trans>If network has been already created, look it up to join</Trans>}
		action={onSearchNetwork}
	/>

	const cancelBtn = <BannerOptionCancelButton 
		btnText={<Trans>Cancel</Trans>} 
		description={<Trans>Or if this node is already configured, you can skip this step</Trans>}
		action={onCancel}
	/>

	return (
		<BannerWithOptions 
			title={title}
			options={[option1, option2]}
			cancelOption={cancelBtn}
			onNotShowAgain={onNotShowAgain}
		/>
	);
};
