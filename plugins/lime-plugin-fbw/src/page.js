import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import './style';

import SelectAction from './containers/SelectAction';
import NetworkForm from './containers/NetworkForm';
import Scan from './containers/Scan';
import Setting from './containers/Setting';
import { useAppContext } from 'utils/app.context';

const Page = ({ }) => {
	const { setMenuEnabled } = useAppContext();
	const [form, setForm] = useState(null);

	function toggleForm(form) {
		return () => setForm(form);
	}

	useEffect(() => {
		setMenuEnabled(false);
		return () => {
			setMenuEnabled(true);
		};
	}, []);

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
