import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { Trans } from '@lingui/macro';
import { Loading } from 'components/loading';
import Toast from 'components/toast';
import { useScanStart, useScanStatus, useScanRestart, useScanStop } from '../../FbwQueries';
import { List } from 'components/list';

import { RescanButton, CancelButton } from './components/buttons';
import { NetworkTile } from './components/networkTile';
import style from '../../style.less';


export const ScanList = ({ 
	selectedNetwork, 
	setSelectedNetwork, 
	cancelSelectedNetwork, 
	cancel, 
}) => {

	const [expandedAps, setExpandedAps] = useState([]) 	// Expand scanned lists
	const [getStatus, setGetStatus] = useState(false) 	// Activate get status
	const [backendError, setBackendError] = useState(false) 	// Activate get status

	const _handleSetGetStatus = (val) => {
		if(!val) {
			setBackendError(true)
		} else {
			setGetStatus(true)
			setBackendError(false)
		}
	}
	
	const [scanStart, {isLoading: isStarting, isError: startError }] 
		= useScanStart({onSuccess: _handleSetGetStatus})
	const [scanRestart, { isLoading: isRestarting, isError: restartError }] 
		= useScanRestart({onSuccess: _handleSetGetStatus})
	const [scanStop, { isError: stopError }] 
		= useScanStop({
			onSuccess: (val) => {
				if(val) {
					setGetStatus(false)
					cancelSelectedNetwork()
					cancel()
					setBackendError(false)
				} else setBackendError(true)
			}
		})

	const { data: scanResults, isError: scanStatusError } = useScanStatus({
		enabled: (getStatus) && (!startError && !restartError),
		refetchInterval: 2000
	});

	const status  = scanResults?.status || null	  	// Scan status
	const networks = scanResults?.networks || []	// Configuration files downloaded
	const scanned  = scanResults?.scanned || []	 	// Scanned AP's

	/* First execution start scanning */
	useEffect(() => {
		scanStart()
	}, []);

	/* Rescan */
	function _rescan() {
		cancelSelectedNetwork()
		scanRestart();
	}

	/* Stop scanning */ 
	function _stop() {
		scanStop()
	}
	
	/* Select Network on the list of scanned networks */
	function selectNetwork(netIdx) {
		const { config, file } = networks[netIdx];
		setSelectedNetwork({
			...selectedNetwork,
			file,
			apname: config.wifi.apname_ssid.split('/%H')[0],
			community: config.wifi.ap_ssid
		});
	}

	const getNetworkFromBssid = (bssid) => {
		for (let i = 0; i < networks.length; i++) {
			if(networks[i].bssid === bssid) return {...networks[i], index: i}
		} 
		return ""
	}
	
	
	const NetworksList = () =>{
		return (
			<List>
				{scanned.length > 0 &&
					<div class={style.assoclistHeader}><Trans>Choose a mesh node to join it's network:</Trans></div>
				}
				{scanned.length > 0 && 
					scanned.map(
						station => 
						<NetworkTile 
							key={station.mac} 
							station={station}
							network={getNetworkFromBssid(station.bssid)}
							expandedAps={expandedAps}
							setExpandedAps={setExpandedAps}
							status={status} 
							onSelect={
								(idx) => {
									selectNetwork(idx);
								}}
						/>
				)}
			</List>
		)
	}

	return (
		<div class="container container-padded">
			<div>
				<div>
					{ 
						(status === 'scanning' && !selectedNetwork?.apname) || (isStarting || isRestarting)
						? (<Loading />) : false 
					}
					{ scanned.length === 0 && status === 'scanned' ?
						<span>
							<h3 className="container-center">
								<Trans>No scan result</Trans>
							</h3>
						</span>
					: false} 
					{ !selectedNetwork?.apname ?
					(<span>
						<NetworksList /> 
					</span>) : null }
					<div class="row" style="min-height: 200px;">
							<div class="six columns"> 
								<RescanButton rescan={_rescan}  />
							</div>
							<div class="six columns"> 
								<CancelButton cancel={_stop} />
							</div>
						</div>
				</div>
			</div>
			{startError || restartError || backendError && <Toast text={<Trans>Error scanning networks</Trans>} />}
			{scanStatusError && <Toast text={<Trans>Error getting scan results</Trans>} />}
			{stopError && <Toast text={<Trans>Error stopping scan</Trans>} />}
			{(status === 'scanning' && <Toast text={<Trans>Scanning for existing networks</Trans>} />)}
		</div>
	);
};
