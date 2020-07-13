import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import style from './style';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getNotes, setNotes } from './notesActions';
import { getNotesState } from './notesSelectors';

import I18n from 'i18n-js';
import { useAppContext } from '../../../src/utils/app.context';

export const Page = ({ setNotes, getNotes, notes, loading }) => {
	const { nodeHostname } = useAppContext();
	const [ value, setValue] = useState(notes || '');

	function handleChange(event) {
		setValue(event.target.value);
	}

	function saveNotes() {
		setNotes(value);
	}

	//Only once
	useEffect(() => {
		getNotes();
		return () => {};
	}, []);

	//After notes reload
	useEffect(() => {
		setValue(notes);
		return () => {};
	}, [notes]);

	return (
		<div className="container container-padded">
			<h4><span>{I18n.t('Notes of')}</span> {nodeHostname}</h4>
			<textarea onChange={handleChange} className={style.notes} value={value} />
			<button disabled={loading} onClick={saveNotes}>{I18n.t('Save notes')}</button>
		</div>
	);
};

const mapStateToProps = (state) => ({
	notes: getNotesState(state),
	loading: state.notes.loading
});

const mapDispatchToProps = (dispatch) => ({
	getNotes: bindActionCreators(getNotes, dispatch),
	setNotes: bindActionCreators(setNotes, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
