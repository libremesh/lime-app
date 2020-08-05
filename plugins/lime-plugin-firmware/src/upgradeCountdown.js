import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';

import I18n from 'i18n-js';

export const SafeUpgradeCountdown = ({ counter }) => {
	const [_counter, setcounter] = useState(counter);
	
	useEffect(() => {
		const interval = setInterval(
			() => setcounter(_counter -1),
			1000
		)
		return () => {
			clearInterval(interval)
		}
	}, [_counter, setcounter])

	return (
		<div class="su-counter">
			<div>{I18n.t(`Cofirm upgrade before ${_counter} seconds or it will be reverted`)}</div>
			<button onClick={() => route('firmware')}>{I18n.t('Go!')}</button>
		</div>
	);
};
