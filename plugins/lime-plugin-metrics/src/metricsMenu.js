import { Trans } from "@lingui/macro";

export const MetricsMenu = () => (
	<span>
		<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M.5 0v14.5H15M8.5 0v3.5m-5 6V12m0-8v1.5m10-1.5v2.5m0 4V13m-11-7.5h2v4h-2v-4zm5-2h2v4h-2v-4zm5 3h2v4h-2v-4z" stroke="currentColor" /></svg>
		<a href={'#/metrics'}><Trans>Metrics</Trans></a>
	</span>
);
