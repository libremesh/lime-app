import { h } from "preact";
import { Trans } from '@lingui/macro';
import { useState, useEffect } from 'preact/hooks';
import { useInterval } from 'react-use';

export const SecondsAgo = ({ initialMs, isStatic=false }) => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		setCount(0);
	}, [initialMs])

	useInterval(() => {
		setCount(prev => prev + 1)
	}, isStatic ? null : 1000);

	const secondsAmount = Math.round(initialMs / 1000) + count;
	if (secondsAmount > 60) {
		return <Trans>more than a minute ago</Trans>;
	}
	return <Trans>{secondsAmount} seconds ago</Trans>;
}
