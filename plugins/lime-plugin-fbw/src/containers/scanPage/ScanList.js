import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { Trans } from '@lingui/macro';
import { Loading } from 'components/loading';
import Toast from 'components/toast';
import { useGetNetworks, useSearchNetworks } from '../../FbwQueries';
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

	const { data: payloadData } = useGetNetworks();

	const status  = payloadData?.status || null	  	// Scan status
	const networks = payloadData?.networks || []	// Configuration files downloaded
	const scanned  = payloadData?.scanned || []	 	// Scanned AP's

	const [searchNetworks, { isLoading: isSubmitting, isError: isSeachNetworkError }] = useSearchNetworks()

	/* Load scan results */
	function _rescan() {
		cancelSelectedNetwork()
		searchNetworks(true);
	}
	
	/* Change selectedNetwork after selectbox change event */
	function selectNetwork(netIdx) {
		const { config, file } = networks[netIdx];
		setSelectedNetwork({
			...selectedNetwork,
			file,
			apname: config.wifi.apname_ssid.split('/%H')[0],
			community: config.wifi.ap_ssid
		});

	}

	useEffect(() => {
		let interval;
		if (status === 'scanned') return;
		else if (status === 'scanning') {
			interval = setInterval(() => {
				console.log('Key pulling the new status', status);
				searchNetworks(false);
			}, 2000);
		}
		else if (!status) {
			searchNetworks(false);
		}
		return () => {
			if (interval) clearInterval(interval);
		};
	}, [status, isSubmitting, searchNetworks]);

	
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
					{ status === 'scanning' && !selectedNetwork?.apname ? (<Loading />): false }
					{ scanned.length === 0 && status === 'scanned' ?
						<span>
							<h3 className="container-center">
								<Trans>No scan result</Trans>
							</h3>
							<div class="row">
								<div class="six columns"> 
									<RescanButton rescan={_rescan}  />
								</div>
								<div class="six columns"> 
									<CancelButton cancel={cancel} />
								</div>
							</div>
						</span>
					: false} 
					{ !selectedNetwork?.apname ?
					(<span>
						<NetworksList /> 
						<div class="row">
							<div class="six columns"> 
								<RescanButton rescan={_rescan}  />
							</div>
							<div class="six columns"> 
								<CancelButton cancel={cancel} />
							</div>
						</div>
					</span>) : null }
				</div>
			</div>
			{isSeachNetworkError && <Toast text={<Trans>Error scanning networks</Trans>} />}
			{(status === 'scanning' && <Toast text={<Trans>Scanning for existing networks</Trans>} />)}
		</div>
	);
};
