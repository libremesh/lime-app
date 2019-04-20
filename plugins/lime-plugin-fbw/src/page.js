import { h, Component } from 'preact';

import './style';

import SelectAction from './containers/SelectAction';
import NetworkForm from './containers/NetworkForm';
import Scan from './containers/Scan';
import Setting from './containers/Setting';

class Page extends Component {
	toggleForm(form) {
		return () => this.setState({ form });
	}

	constructor(props){
		super(props);
		this.toggleForm = this.toggleForm.bind(this);

		this.state = {
			form: null,
			setting: false
		};
	}

	render (){
		const { form } = this.state;
		return (
			<div>
				{form === 'create' && <NetworkForm toggleForm={this.toggleForm} />}
				{form === 'scan' && <Scan toggleForm={this.toggleForm} />}
				{form === 'setting' && <Setting toggleForm={this.toggleForm} />}
				{!form && <SelectAction toggleForm={this.toggleForm} />}
			</div>
		);
	}
}

export default Page;