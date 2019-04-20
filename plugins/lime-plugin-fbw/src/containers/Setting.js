import { h, Component } from 'preact';
import I18n from 'i18n-js';

import '../style';

import ProgressBar from '../../../../src/components/progressbar';

class Setting extends Component {
	toggleForm(form) {
		return () => this.setState({ form });
	}

	runProgress () {
		const addProgress = () => {
			if (this.state.progress <= 99.96) {
				this.setState({
					progress: this.state.progress + 1.666666,
					time: this.state.time - 1
				});
			}
			else {
				clearInterval(progressInterval);
			}
		};
		const progressInterval = setInterval(addProgress, 1000);
	}

	constructor(props){
		super(props);
		this.state = {
			progress: 0,
			time: 60
		};
	}

	componentDidMount() {
		setTimeout(() => {
			const interval = setInterval(() => {
				
			}, 3000);
		}, 60000);
		this.runProgress();
	}

	render (){
		return (
			<div class="container" style={{ paddingTop: '100px' }}>
				<h1>{I18n.t('Setting network')}</h1>
				<ProgressBar progress={this.state.progress} />
				<div style={{ width: '100%' }}>
					<span style={{ margin: '0 auto', textAlign: 'center' }}>{I18n.t('Please wait')} {this.state.time} {I18n.t('seconds')}</span>
				</div>
			</div>
		);
	}
}

export default Setting;