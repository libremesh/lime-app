import { Banner } from 'components/banner';
import { useState } from 'preact/hooks';
import I18n from 'i18n-js';
import { useDismissFbw } from '../queries';
import { route } from 'preact-router';
import { useAppContext } from 'utils/app.context';

export const FbwBanner = () => {
	const [notShowAgain, setnotShowAgain] = useState(false);
	const [dismissFbw] = useDismissFbw();
	const { cancelFbw } = useAppContext();

	function onOk () {
		route('firstbootwizard')
	}

	function onCancel() {
		if (notShowAgain) {
			dismissFbw();
		}
		else {
			cancelFbw();
		}
	}

	function onNotShowAgain(e) {
		setnotShowAgain(e.target.checked);
	}

	const title = I18n.t('Please configure your network');
	const description =  I18n.t(`Your router has not yet been configured, 
			you can use our wizard to incorporate it into an existing network or create a new one.
			If you ignore this message it will continue to work with the default configuration.`);

	return (
		<Banner onOk={onOk} onCancel={onCancel} title={title} description={description} onNotShowAgain={onNotShowAgain} />
	);
};
