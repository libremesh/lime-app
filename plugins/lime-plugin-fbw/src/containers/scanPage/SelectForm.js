import { useEffect } from 'preact/hooks';


import { Trans } from '@lingui/macro';
import Toast from 'components/toast';
import { useSetNetwork } from '../../FbwQueries';
import { isValidHostname, slugify } from 'utils/isValidHostname';


import { BackButton, CancelButton } from './components/buttons'


export const SelectForm = ({ 
    toggleForm, 
    setExpectedHost, 
    setExpectedNetwork,
    state,
    setState,
    cancelSelectedNetwork
 }) => {

    // const [status, setStatus] = useState()		// Scan status

	const [setNetwork, { isLoading: isSetNetworkSubmitting, isError: isSetNetworkError }] = useSetNetwork({
		onSuccess: () => {
			setExpectedHost(state.hostname)
			setExpectedNetwork(state.community)
			toggleForm('setting')();
		},
	});

	useEffect(() => {
		// if (isSetNetworkError) setStatus('error')
	},[isSetNetworkError])

	
	/* Validate state and set network in the router */
	function _setNetwork() {

		if (state.apname && isValidHostname(state.hostname, true)) {
			setNetwork({
				file: state.file,
				hostname: state.hostname,
				network: state.community
			});
		}
		else {
			setState({
				...state,
				error: true
			});
			setTimeout(() => {
				setState({
					...state,
					error: false
				});
			}, 2000);
		}
	}

	/* Input to state function*/
	function _changeHostName (e) {
		const end = e.type === 'change';
		e.target.value = slugify(e.target.value.toLocaleLowerCase(), end);
		setState({...state, hostname: e.target.value || ''});
		return e;
	}
    

	return (
		<div class="container container-padded">
			<div>
				<div>
					{ state.apname ? (
						<div>
							<div class="container">
								<div>
									<h4><Trans>Join the mesh</Trans></h4>
									<label><Trans>Selected network to join</Trans></label>
									<input type="text" disabled={true} class="u-full-width" value={state.apname} />
									<label for="hostname"><Trans>Choose a name for this node</Trans></label>
									<input id="hostname" type="text" placeholder={`Host name`} class="u-full-width" value={state.hostname} onInput={_changeHostName} />
								</div>
								<div class="row">

                                    <button
											onClick={_setNetwork}
											disabled={!isValidHostname(state.hostname) || isSetNetworkSubmitting}
											class="u-full-width"
										>
                                        <Trans>Set network</Trans>
                                    </button>
									<div class="six columns">
									    <CancelButton />

									</div>
									<div class="six columns"> 
										<BackButton goBack={cancelSelectedNetwork} />
									</div>
								</div>
							</div>
						</div>
					): false} 
				</div>
			</div>
			{state.error && <Toast text={<Trans>Must select a network and a valid hostname</Trans>} />}
		</div>
	);
};
