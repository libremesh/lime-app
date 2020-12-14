import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { useHostname } from 'utils/queries';
import { useAssocList, useMeshIfaces } from './alignQueries';
import { ifaceToRadio } from './utils';
import { SignalBar } from './components/signalBar';
import { SecondsAgo } from './components/secondsAgo';
import I18n from 'i18n-js';

import Loading from 'components/loading';
import Tabs from 'components/tabs';
import style from './style.less';

export const AssocRow = ({station}) => {
	const { data: hostname, isLoading, isError } = useHostname(station.mac);
	return (
		<div class={style.row}>
			<div>
				{( isLoading || isError ?
					<div class={`${style.fetchingName} withLoadingEllipsis`}>
						{ I18n.t('Fetching name') }
					</div>
					:
					<div class={style.stationHostname}>
						{ hostname }
					</div>
				)}
				{ station.inactive >= 3000 && (
					<div>
						<div>{I18n.t('Not associated')}</div>
						<div>{`${I18n.t('Last packet')}:`} <SecondsAgo initialMs={station.inactive} isStatic /></div>
					</div>
				)}
			</div>
			{station.inactive >= 3000 ? (
				<div class={style.signal}>
					X
					<SignalBar signal={null} className={style.bar} />
				</div>
			): (
				<div class={style.signal}>
					{ station.signal }
					<SignalBar signal={station.signal} className={style.bar} />
				</div>
			)}
		</div>
	)
}

export const AssocList = ({iface}) => {
	const { data: assoclist, isLoading } = useAssocList(iface, {
		refetchInterval: 2000
	});

	if (isLoading) {
		return <div className="container container-center"><Loading /></div>
	}

	return (
		<div class="d-flex flex-column flex-grow-1">
			{assoclist.map(station => <AssocRow key={station.mac} station={station} />)}
			{assoclist.length === 0 &&
				<div className="container-center">
					{I18n.t("This radio is not associated with other nodes")}
				</div>
			}
		</div>
	)
}


export const Align = ({}) => {
	const [ tabs, setTabs ] = useState([]);
	const [ selectedIface, setSelectedIface ] = useState(null);
	const { data: ifaces, isLoading } = useMeshIfaces();

	useEffect(() => {
		if (!ifaces) return;
		const tabs = ifaces.sort().map(iface => ({
			key: iface,
			repr: ifaceToRadio(iface)
		}))
		setTabs(tabs);
		if (ifaces.length > 0) {
			setSelectedIface(ifaces[0]);
		}
	}, [ifaces])

	if (isLoading) {
		return <div className="container container-center"><Loading /></div>
	}

	if (!ifaces) {
		return <div className="container container-center">
			{I18n.t('The are not mesh interfaces available')}
		</div>
	}

	return (
		<div class="d-flex flex-column flex-grow-1">
			<Tabs tabs={tabs} current={selectedIface} onChange={setSelectedIface} />
			{selectedIface && <AssocList iface={selectedIface} />}
		</div>
	);
}

export default Align;
