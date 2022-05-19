import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import style from '../style.less';

import { Trans, t } from '@lingui/macro';
import { Loading } from 'components/loading';
import Toast from 'components/toast';
import { isValidHostname, slugify } from 'utils/isValidHostname';
import { useBoardData } from 'utils/queries';
import { useSearchNetworks, useSetNetwork, useGetNetworks } from '../FbwQueries';
import { List, ListItem } from 'components/list';
import { SignalBar } from '../../../lime-plugin-align/src/components/signalBar'; // todo(kon): implement common component


export const Scan = ({ toggleForm, setExpectedHost, setExpectedNetwork }) => {
	const { data: boardData } = useBoardData();
	const [state, setState] = useState({
		createForm: false,
		error: null,
		hostname: boardData?.hostname
	});

	const [status, setStatus] = useState()		// Scan status
	const [networks, setNetworks] = useState() 	// Configuration files downloaded
	const [scanned, setScanned] = useState([]) 	// Scanned AP's

	const [expandedAps, setExpandedAps] = useState([]) 	// Expand scanned lists


	const { data: payloadData } = useGetNetworks();

	const [searchNetworks, { isLoading: isSubmitting,isError: isSeachNetworkError}] = useSearchNetworks()

	const [setNetwork, { isLoading: isSetNetworkSubmitting, isError: isSetNetworkError }] = useSetNetwork({
		onSuccess: () => {
			setExpectedHost(state.hostname)
			setExpectedNetwork(state.community)
			toggleForm('setting')();
		},
	});

	useEffect(() => {
		if (isSeachNetworkError || isSetNetworkError) setStatus('error')
	},[isSeachNetworkError, isSetNetworkError])

	/* Load scan results */
	function _searchNetworks() {
		cancelSelectedNetwork()
		searchNetworks(true);
	}

	/* Change state after selectbox change event */
	function selectNetwork(netIdx) {
		const { config, file } = networks[netIdx];
		setState({
			...state,
			file,
			apname: config.wifi.apname_ssid.split('/%H')[0],
			community: config.wifi.ap_ssid
		});
	}

	/* Used to dismis previously selected network, ex: on back or rescan button */
	function cancelSelectedNetwork() {
		setState({
			...state,
			file: "",
			apname: "",
			community: ""
		});
	}

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

	/* Input to state function*/
	/* function _changePassword (e) {
		setState({
			...state,
			password: e.target.value || ''
		});
	} */

	useEffect(() => {
		setStatus(payloadData?.status || null)
		setNetworks(payloadData?.networks || [])
		setScanned(payloadData?.scanned || [])
	}, [payloadData])

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

	const RescanButton = () => {
		return (
			<button
				onClick={_searchNetworks}
				class="u-full-width"
			>
				<Trans>Rescan</Trans>
			</button>
		)
	}

	const CancelButton = () => {
		return (
			<button
				onClick={toggleForm(null)}
				class="u-full-width"
			>
				<Trans>Cancel</Trans>
			</button>
		)
	}

	const getNetworkFromBssid = (bssid) => {
		for (let i = 0; i < networks.length; i++) {
			if(networks[i].bssid === bssid) return {...networks[i], index: i}
		} 
		return ""
	}
	
	const NetworkBox = ({ station }) => {
		let network = getNetworkFromBssid(station.bssid);
		let hostname = network.ap; // Hostname got from config file
		let listKey =
		 station.bssid.replaceAll(":", "_"); // Used as key to expand the card
	
		const setExpanded = () => {
		  if (expandedAps.includes(listKey)) {
			setExpandedAps([...expandedAps.filter((v) => v !== listKey)]);
		  } else {
			setExpandedAps([...expandedAps, listKey]);
		  }
		};
	
		const statusMessage = () => {
			// console.debug(station.bssid, hostname)
		  // Case no scanned status or scanned is true but scan end
		  if ((station.status == null 
				|| (station?.status?.code === "downloaded_config" && hostname === undefined)
				|| (station?.status?.code === "downloading_config" )) 
				&& status === "scanned") {
			return (
			  <div class={`${style.fetchingName}`}>
				<Trans>Error reaching hostname!</Trans>
			  </div>
			);
		  }
		  // Case configuration download not started yet
		  else if (station.status == null) {
			return (
			  <div class={`${style.fetchingName} withLoadingEllipsis`}>
				<Trans>Connection attempt not yet started</Trans>
			  </div>
			);
		  }
		  // Case scan retval is false
		  else if (station.status.retval === false) {
			let msg;
			switch (station.status.code) {
			  case "error_download_lime_community":
				msg = <Trans>Error downloading lime community</Trans>;
				break;
			  case "error_not_configured":
				msg = (
				  <Trans>Error destination network is not configured yet</Trans>
				);
				break;
			  case "error_download_lime_assets":
				msg = <Trans>Error downloading lime assets</Trans>;
				break;
			}
			return <div class={`${style.fetchingName}`}>{msg}</div>;
		  }
		  // Case scan retval is true
		  else if (station.status.retval === true) {
			// Is downloading
			if (station.status.code == "downloading_config") {
			  return (
				<div class={`${style.fetchingName} withLoadingEllipsis`}>
				  <Trans>Fetching name</Trans>
				</div>
			  );
			}
			// Hast hostname
			else if (station.status.code === "downloaded_config" && hostname) {
			  return (
				<span>
				  <div style={"font-size: 2rem;"}>{hostname}</div>
				  <div style={"font-size: 1.5rem; padding-right: 10px;"}>
					{`(${  network.config.wifi.ap_ssid  })`}
				  </div>
				</span>
			  );
			}
		  }
		  return (
			<div class={`${style.fetchingName}`}>
			  <Trans>Unknown error</Trans>
			</div>
		  );
		};
	
		return (
		  <ListItem
			onClick={setExpanded}
			style={"padding-left: 0.5em; padding-right:0.5em;"}
			key={listKey}
			data-testid={listKey}
		  >
			<div>
			  {
			  	statusMessage()
			  }
			  <div
				class={
				  expandedAps.includes(listKey)
					? style.itemActive
					: style.itemHidden
				}
			  >
				<div>{station.bssid}</div>
				<div>
				  <Trans>Channel</Trans>: {station.channel}
				</div>
			  </div>
			</div>
			<div class={`${style.netItemRight} d-flex`}>
			  {hostname && station?.status?.code == "downloaded_config" && (
				<button
				  class={style.backArrow}
				  onClick={() => {
					selectNetwork(network.index);
				  }}
				>
				  <Trans>Select</Trans>
				</button>
			  )}
	
			  <div class={style.signal} style={"margin-bottom:auto;"}>
				<div class="d-flex flex-grow-1 align-items-baseline">
				  <div>{station.signal}</div>
				</div>
				<SignalBar signal={station.signal} className={style.bar} />
			  </div>
			</div>
		  </ListItem>
		);
	  };
	

	const NetworksList = () =>{
		return (
			<List>
				{scanned.length > 0 &&
					<div class={style.assoclistHeader}><Trans>Choose a mesh node to join it's network:</Trans></div>
				}
				{scanned.length > 0 && 
					scanned.map(station => <NetworkBox key={station.mac} station={station} />
				)}
			</List>
		)
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
									<input id="hostname" type="text" placeholder={t`Host name`} class="u-full-width" value={state.hostname} onInput={_changeHostName} />
								</div>
								<div class="row">
									<div class="six columns">
										<button
											onClick={_setNetwork}
											disabled={!isValidHostname(state.hostname) || isSetNetworkSubmitting}
											class="u-full-width"
										>
											<Trans>Set network</Trans>
										</button>
									</div>
									<div class="six columns"> 
										<RescanButton />
									</div>
									<button
										onClick={cancelSelectedNetwork}
										class="u-full-width"
									>
										<Trans>Back</Trans>
									</button>
									<CancelButton />
								</div>
							</div>
						</div>
					): false} 
					{ status === 'scanning' && !state.apname ? (<Loading />): false }
					{ scanned.length === 0 && status === 'scanned' ?
						<span>
							<h3 className="container-center">
								<Trans>No scan result</Trans>
							</h3>
							<div class="row">
								<div class="six columns"> 
									<RescanButton />
								</div>
								<div class="six columns"> 
									<CancelButton />
								</div>
							</div>
						</span>
					: false} 
					{ !state.apname ? 
					(<span>
						<NetworksList /> 
						<CancelButton />
					</span>) : null  }
				</div>
			</div>
			{state.error && <Toast text={<Trans>Must select a network and a valid hostname</Trans>} />}
			{(status === 'scanning' && <Toast text={<Trans>Scanning for existing networks</Trans>} />)}
		</div>
	);
};
