import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import './style.less';

import SelectAction from './containers/SelectAction';
import { NetworkForm } from './containers/NetworkForm';
import { Scan } from './containers/Scan';
import { Setting } from './containers/Setting';
import { useAppContext } from 'utils/app.context';

const Page = ({ }) => {
	const { setMenuEnabled } = useAppContext();
	const [form, setForm] = useState(null);

	const [expectedHost, setExpectedHost] = useState(null);
	const [expectedNetwork, setExpectedNetwork] = useState(null);

	const toggleForm = (form) => () => setForm(form)

	useEffect(() => {
		setMenuEnabled(false);
		return () => {
			setMenuEnabled(true);
		};
	}, [setMenuEnabled]);

	return (
		<Fragment>
			{form === 'create' && <NetworkForm toggleForm={toggleForm} setExpectedHost={setExpectedHost} setExpectedNetwork={setExpectedNetwork} />}
			{form === 'scan' &&
				<Scan toggleForm={toggleForm} setExpectedHost={setExpectedHost} setExpectedNetwork={setExpectedNetwork} />}
			{form === 'setting' && <Setting toggleForm={toggleForm} expectedHost={expectedHost} expectedNetwork={expectedNetwork} />}
			{!form && <SelectAction toggleForm={toggleForm} />}
		</Fragment>
	);
};

export default Page;
