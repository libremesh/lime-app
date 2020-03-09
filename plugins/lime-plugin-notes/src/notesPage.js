import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import './style';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getNotes, setNotes } from './notesActions';
import { getNotesState } from './notesSelectors';

import I18n from 'i18n-js';

export const Page = ({ setNotes, getNotes, notes, hostname, loading }) => {

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
		<div class="container" style={{ paddingTop: '100px' }}>
			<h4><span>{I18n.t('Notes of')}</span> {hostname}</h4>
			<textarea onChange={handleChange} class={'notes'} value={value} />
			<button disabled={loading} onClick={saveNotes}>{I18n.t('Save notes')}</button>
		</div>
	);
};

const mapStateToProps = (state) => ({
	notes: getNotesState(state),
	loading: state.notes.loading,
	hostname: state.meta.selectedHost
});

const mapDispatchToProps = (dispatch) => ({
	getNotes: bindActionCreators(getNotes, dispatch),
	setNotes: bindActionCreators(setNotes, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);