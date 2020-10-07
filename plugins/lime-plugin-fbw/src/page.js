import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import './style';

import SelectAction from './containers/SelectAction';
import NetworkForm from './containers/NetworkForm';
import Scan from './containers/Scan';
import Setting from './containers/Setting';
import { useAppContext } from 'utils/app.context';
import { FbwBanner } from './containers/FbwBanner';

const Page = ({ }) => {
	const { setMenuEnabled, cancelFbw } = useAppContext();
	const [form, setForm] = useState(null);
	const [banner, setBanner] = useState(true);

	function toggleForm(form) {
		return () => setForm(form);
	}

	function bannerCancel() {
		cancelFbw();
	}

	function bannerOk() {
		setBanner(false);
	}

	useEffect(() => {
		setMenuEnabled(false);
		return () => {
			setMenuEnabled(true);
		};
	}, []);

	if (banner) {
		return <FbwBanner onOk={bannerOk} onCancel={bannerCancel} />
	}

	return (
		<Fragment>
			{form === 'create' && <NetworkForm toggleForm={toggleForm} />}
			{form === 'scan' && <Scan toggleForm={toggleForm} />}
			{form === 'setting' && <Setting toggleForm={toggleForm} />}
			{!form && <SelectAction toggleForm={toggleForm} />}
		</Fragment>
	);
};

export default Page;
