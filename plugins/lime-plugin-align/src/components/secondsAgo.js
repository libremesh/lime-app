import I18n from 'i18n-js';
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

	const seconds = ms => Math.round(ms / 1000) + count;
	if (seconds(initialMs) > 60) {
		return I18n.t('more than a minute ago');
	}
	return I18n.t('%{seconds} seconds ago', { seconds: seconds(initialMs) });
}
