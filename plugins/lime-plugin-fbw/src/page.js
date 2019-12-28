import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './style';

import { toggleMenuButton } from '../../lime-plugin-core/src/metaActions';
import SelectAction from './containers/SelectAction';
import NetworkForm from './containers/NetworkForm';
import Scan from './containers/Scan';
import Setting from './containers/Setting';

const Page = ({ toggleMenuButton }) => {
	const [form, setForm] = useState(null);

	function toggleForm(form) {
		return () => setForm(form);
	}

	useEffect(() => {
		toggleMenuButton(true);
		return () => {
			toggleMenuButton(false);
		};
	}, []);

	return (
		<div>
			{form === 'create' && <NetworkForm toggleForm={toggleForm} />}
			{form === 'scan' && <Scan toggleForm={toggleForm} />}
			{form === 'setting' && <Setting toggleForm={toggleForm} />}
			{!form && <SelectAction toggleForm={toggleForm} />}
		</div>
	);
};

export default connect(
	() => ({}),
	(dispatch) => ({
		toggleMenuButton: bindActionCreators(toggleMenuButton, dispatch)
	})
)(Page);