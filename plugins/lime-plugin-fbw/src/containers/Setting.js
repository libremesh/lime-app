import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Trans } from '@lingui/macro';

import '../style.less';

import ProgressBar from 'components/progressbar';
import Loading from 'components/loading';
import { useInterval } from 'react-use';

export const Setting = ({ expectedHost, expectedNetwork, delay=1000 }) => {
	const [ progress, setProgress ] = useState(0);
	const [ time, setTime ] = useState(120);

	const [ state, setState ] = useState({
		hostname: null,
		action: 'setting',
		notOnNetwork: false
	});

	const wifiSsid = expectedNetwork + '/' + expectedHost;
	function fetchHost (cb) {
		if (state.action === 'finish') return;
		if (state.action === 'setting') {
			setState({
				...state, action: 'checking'
			});
		}

		fetch('http://thisnode.info/cgi-bin/hostname')
			.then(res => res.text())
			.then(res => {
				res = res.split('\n')[0];
				if (res === expectedHost) {
					setState({
						...state,
						action: 'finish',
						hostname: res,
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
		if (time > 0) setTime(time => time - 1);
		if (progress < 100) setProgress(progress => progress + (100/totalTime));
		if (time <= 1) cb();
	}

	function reload () {
		window.location.href = 'http://thisnode.info/app';
	}

	useInterval(() => {
		runProgress(120, fetchHost);
	}, delay);


	return (
		<div class="container container-padded">
			{state.action !== 'finish'
				? (
					<div>
						{ state.action === 'setting'
							? (
								<div>
									<h1><Trans>Setting network</Trans></h1>
									<ProgressBar progress={progress} />
									<div style={{ width: '100%' }}>
										<span style={{ margin: '0 auto', textAlign: 'center' }}><Trans>Please wait {time} seconds</Trans></span>
									</div>
								</div>
							)
							: false
						}
						{ state.action === 'checking'
							? (
								<div>
									<h1><Trans>Checking connection</Trans></h1>
									<Loading />
									  { state.notOnNetwork
										? <p><Trans>You are connected to another node in the network, try connecting to</Trans> {expectedNetwork}/{expectedHost}</p>
										: <p><Trans>You should try to connect to the network {wifiSsid}.</Trans></p>
									  }
								</div>
							  )
							: false
						}
					</div>
				)
				: <div>
					<h1><Trans>Congratulations</Trans></h1>
					<div>
						<p><Trans>You have successfuly connected to</Trans> {state.hostname}</p>
						<p><Trans>You are now part of </Trans> {expectedNetwork}</p>
						<button onClick={reload}><Trans>Reload page</Trans></button>
					</div>
				</div>
			}
		</div>
	);
};

