import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import I18n from 'i18n-js';
import { connect } from 'react-redux';

import '../style';

import ProgressBar from '../../../../src/components/progressbar';
import Loading from '../../../../src/components/loading';

import axios from 'axios';

function useInterval (callback, delay, off) {
	const savedCallback = useRef();

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);

}

const Setting = ({ expectedHost, expectedNetwork }) => {
	const [ progress, setProgress ] = useState(0);
	const [ time, setTime ] = useState(120);

	const [ state, setState ] = useState({
		hostname: null,
		action: 'setting',
		notOnNetwork: false
	});

	function fetchHost (cb) {
		if (state.action === 'finish') return;
		if (state.action === 'setting') {
			setState({
				...state, action: 'checking'
			});
		}

		axios.get('http://thisnode.info/cgi-bin/hostname')
			.then(res => res.data.split('\n')[0])
			.then(res => {
				if (res === expectedHost) {
					setState({
						...state,
						action: 'finish',
						notOnNetwork: false
					});
				}
				else if (state.notOnNetwork === false) {
					setState({
						...state,
						notOnNetwork: true
					});
				}
			})
			.catch(err => {
				if (state.notOnNetwork === true) {
					setState({
						...state,
						notOnNetwork: false
					});
				}
			});
	}

	function runProgress (totalTime, cb) {
		if (time > 0) setTime(time - 1);
		if (progress < 100) setProgress(progress + (100/totalTime));
		if (time <= 1) cb();
	}

	function reload () {
		window.location.href = 'http://thisnode.info/app';
	}

	useInterval(() => {
		runProgress(120, fetchHost);
	}, 1000);


	return (
		<div class="container" style={{ textAlign: 'center', paddingTop: '100px' }}>
			{state.action !== 'finish'
				? (
					<div>
						{ state.action === 'setting'
							? (
								<div>
									<h1>{I18n.t('Setting network')}</h1>
									<ProgressBar progress={progress} />
									<div style={{ width: '100%' }}>
										<span style={{ margin: '0 auto', textAlign: 'center' }}>{I18n.t('Please wait')} {time} {I18n.t('seconds')}</span>
									</div>
								</div>
							)
							: false
						}
						{ state.action === 'checking'
							? (
								<div>
									<h1>{I18n.t('Checking connection')}</h1>
									<Loading />
									  { state.notOnNetwork
										? <p>{I18n.t('You are connected to another node in the network, try connecting to')} {expectedNetwork}/{expectedHost}</p>
										: <p>{I18n.t('You should try to connect to the network %{network}.', { network: expectedNetwork +'/'+expectedHost })} </p>
									  }
								</div>
							  )
							: false
						}
					</div>
				)
				: <div>
					<h1>{I18n.t('Congratulations')}</h1>
					<div>
						<p>{I18n.t('You have successfuly connected to')} {state.hostname}</p>
						<p>{I18n.t('You are now part of ')} {expectedNetwork}</p>
						<button onClick={reload}>{I18n.t('Reload page')}</button>
					</div>
				</div>
			}
		</div>
	);
};

const mapStateToProps = (state) => ({
	expectedHost: state.firstbootwizard.expectedHost,
	expectedNetwork: state.firstbootwizard.expectedNetwork
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
