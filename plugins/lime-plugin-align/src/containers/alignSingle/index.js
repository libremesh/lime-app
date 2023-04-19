import { Trans } from "@lingui/macro";
import { route } from "preact-router";
import { useEffect, useState } from "preact/hooks";

import Loading from "components/loading";
import { SignalBar } from "components/signalbar";
import signalStyle from "components/signalbar/style.less";

import { useBatHost } from "utils/queries";

import { useAssocList } from "../../alignQueries";
import { SecondsAgo } from "../../components/secondsAgo";
import { SignalSpeech } from "../../components/signalSpeech";
import { ifaceToRadioNumber } from "../../utils";
import style from "./style.less";

function getStation(assoclist, mac) {
    const station = assoclist.filter((sta) => sta.mac === mac);
    if (station.length > 0) {
        return station[0];
    }
    return null;
}

export const BestSignal = ({ signal }) => {
    const [bestSignal, setBestSignal] = useState(null);
    const [bestSignalTimestamp, setBestSignalTimestamp] = useState(null);

    useEffect(() => {
        if (!bestSignal || signal >= bestSignal) {
            setBestSignal(signal);
            setBestSignalTimestamp(Date.now());
        }
    }, [signal, bestSignal]);

    if (!bestSignal) return;

    return (
        <div class={style.section}>
            <span>
                <Trans>Best signal</Trans>:
            </span>
            <span class={style.bestSignal}>
                {bestSignal}
                <span class={style.unit}>dBm</span>
            </span>
            <SecondsAgo initialMs={Date.now() - bestSignalTimestamp} />
        </div>
    );
};

const SignalBox = ({ signal }) => (
    <div class="d-flex justify-content-center">
        <div class="d-flex flex-column">
            <div class="d-flex">
                {signal && (
                    <div class={signalStyle.signal}>
                        {signal}
                        <span class={signalStyle.unit}>dBm</span>
                    </div>
                )}
                {!signal && (
                    <div class={style.notAssociated}>
                        <Trans>Signal lost</Trans>
                    </div>
                )}
                {signal && (
                    <SignalSpeech signal={signal} className={style.speech} />
                )}
            </div>
            <SignalBar signal={signal} className={signalStyle.bar} />
        </div>
    </div>
);

const AlignSingle = ({ iface, mac }) => {
    const { data: bathost } = useBatHost(mac, iface);
    const { data: assocList, isLoading } = useAssocList(iface, {
        refetchInterval: 2000,
    });
    const station = assocList && getStation(assocList, mac);
    const fromRadio = ifaceToRadioNumber(iface);
    const toRadio = bathost.iface && ifaceToRadioNumber(bathost.iface);

    if (isLoading) {
        return (
            <div className="container container-center">
                <Loading />
            </div>
        );
    }

    return (
        <div class="d-flex flex-grow-1 flex-column container-padded">
            <div class="d-flex">
                <button class={style.backArrow} onClick={() => route("/align")}>
                    ←
                </button>
            </div>
            <SignalBox
                signal={station && station.associated && station.signal}
            />
            <div class={style.section}>
                <div>
                    <Trans>With radio {fromRadio} alignin with</Trans>
                </div>
                <div class={style.hostname}>{bathost.hostname}</div>
                {toRadio && (
                    <div>
                        <Trans>On its radio {toRadio}</Trans>
                    </div>
                )}
            </div>
            <BestSignal signal={station && station.signal} />
            {station && !station.associated && (
                <div class={style.section}>
                    <span>
                        <Trans>Last packet</Trans>:{" "}
                        <SecondsAgo initialMs={station.inactive} isStatic />
                    </span>
                </div>
            )}
        </div>
    );
};

export default AlignSingle;
