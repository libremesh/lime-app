import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Trans } from '@lingui/macro';
import Toast from 'components/toast';
import { useSetNetwork } from '../../FbwQueries';
import { isValidHostname, slugify } from 'utils/isValidHostname';

import { BackButton, CancelButton } from './components/buttons'


export const SelectForm = ({ 
    toggleForm, 
    setExpectedHost, 
    setExpectedNetwork,
    selectedNetwork,
    setSelectedNetwork,
    cancelSelectedNetwork,
	cancel
 }) => {

	const [validHostnameError, setValidHostnameError] = useState(false)		// Scan status


	const [setNetwork, { isLoading: isSetNetworkSubmitting, isError: isSetNetworkError }] = useSetNetwork({
		onSuccess: () => {
			setExpectedHost(selectedNetwork.hostname)
			setExpectedNetwork(selectedNetwork.community)
			toggleForm('setting')();
		},
	});

	/* Validate selectedNetwork and set network in the router */
	function _setNetwork() {
		if (selectedNetwork.apname && isValidHostname(selectedNetwork.hostname, true)) {
			setNetwork({
				file: selectedNetwork.file,
				hostname: selectedNetwork.hostname,
				network: selectedNetwork.community
			});
		}
		else {
			setValidHostnameError(true)
			setTimeout(() => {
				setValidHostnameError(false)
			}, 2000);
		}
	}

	/* Input to selectedNetwork function*/
	function _changeHostName (e) {
		const end = e.type === 'change';
		e.target.value = slugify(e.target.value.toLocaleLowerCase(), end);
		setSelectedNetwork({...selectedNetwork, hostname: e.target.value || ''});
		return e;
	}
    

	return (
		<div class="container container-padded">
			<div>
				<div>
					{ selectedNetwork.apname ? (
						<div>
							<div class="container">
								<div>
									<h4><Trans>Join the mesh</Trans></h4>
									<label><Trans>Selected network to join</Trans></label>
									<input type="text" disabled={true} class="u-full-width" value={selectedNetwork.apname} />
									<label for="hostname"><Trans>Choose a name for this node</Trans></label>
									<input id="hostname" type="text" placeholder={`Host name`} class="u-full-width" value={selectedNetwork.hostname} onInput={_changeHostName} />
								</div>
								<button
										onClick={_setNetwork}
										disabled={!isValidHostname(selectedNetwork.hostname) || isSetNetworkSubmitting}
										class="u-full-width"
									>
									<Trans>Set network</Trans>
								</button>
								<div class="row">
									<div class="six columns">
									    <CancelButton cancel={cancel} />
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
			{isSetNetworkError && <Toast text={<Trans>Error setting network</Trans>} />}
			{validHostnameError&& <Toast text={<Trans>Must select a valid hostname</Trans>} />}
		</div>
	);
};
