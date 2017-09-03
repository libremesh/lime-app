import { h, Component } from 'preact';

import './style';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { getNotes, setNotes } from './notesActions';
import { getNotesState } from './notesSelectors';

import I18n from 'i18n-js';

class Page extends Component {

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	saveNotes() {
		this.props.setNotes(this.state.value);
	}

	constructor(props) {
		super(props);
		this.state = { value: this.props.notes };
		this.handleChange = this.handleChange.bind(this);
		this.saveNotes = this.saveNotes.bind(this);
	}

	componentWillMount() {
		this.props.getNotes();
	}

	render() {
		let getNotes = (notes) => notes;

		return (
			<div class="container" style={{ paddingTop: '100px' }}>
				<h4><span translate="yes">{I18n.t('Notes of')}</span> {this.props.hostname}</h4>
				<textarea onChange={this.handleChange} class="notes" value={getNotes(this.props.notes)} />
				<button onClick={this.saveNotes}>{I18n.t('Save notes')}</button>
			</div>
		);
	}
}


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