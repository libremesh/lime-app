import { useHostname } from "utils/queries";
import { useEffect, useState } from "preact/hooks";
import I18n from 'i18n-js';
import { useAssocList } from "../../alignQueries";
import { ifaceToRadio } from "../../utils";
import { SignalBar } from "../../components/signalBar";
import { SecondsAgo } from "../../components/secondsAgo";
import { SignalSpeech } from "../../components/signalSpeech";
import style from './style.less';

function getStation(assoclist, mac) {
	const station = assoclist.filter(sta => sta.mac === mac);
	if (station.length > 0) {
		return station[0];
	}
	return null;
}

export const BestSignal = ({signal}) => {
	const [bestSignal, setBestSignal] = useState(null);
	const [bestSignalTimestamp, setBestSignalTimestamp] = useState(null);

	useEffect(() => {
		if (!bestSignal || signal > bestSignal) {
			setBestSignal(signal)
			setBestSignalTimestamp(Date.now())
		}
	}, [signal, bestSignal])

	if (!bestSignal) return;

	return (
		<div class={style.section}>
			<span>{I18n.t('Best signal').concat(':')} </span>
			<span class={style.bestSignal}>{bestSignal}</span>
			<SecondsAgo initialMs={Date.now() - bestSignalTimestamp} />
		</div>
	)
}

const SignalBox = ({signal}) => (
	<div class="d-flex justify-content-center">
		<div class="d-flex flex-column">
			<div class="d-flex">
				{signal && <div class={style.signal}>{signal}</div>}
				{!signal && <div class={style.notAssociated}>{I18n.t('Not associated') }</div>}
				{signal && <SignalSpeech signal={signal} className={style.speech} />}
			</div>
			<SignalBar signal={signal} className={style.bar} />
		</div>
	</div>
);

export const AlignSingle = ({iface, mac}) => {
	const { data: hostname } = useHostname(mac);
	const { data: assocList } = useAssocList(iface);
	const station = getStation(assocList, mac);
	const radio = ifaceToRadio(iface);
	return (
		<div class="d-flex flex-column container-padded">
			<SignalBox signal={station && station.associated && station.signal} />
			<div class={style.section}>
				<div>{I18n.t('With radio %{radio} alignin with', {radio})}</div>
				<div class={style.hostname}>{ hostname }</div>
			</div>
			<BestSignal signal={station && station.signal} />
			{station && !station.associated &&
				<div class={style.section}>
					<span>{`${I18n.t('Last packet')}: `}<SecondsAgo initialMs={station.inactive} isStatic /></span>
				</div>
			}
		</div>
	)
};
