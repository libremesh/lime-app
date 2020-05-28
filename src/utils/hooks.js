import { useState } from 'preact/hooks';

export const useInput = initialValue => {
	const [value, setValue] = useState(initialValue);

	return {
		value,
		setValue,
		reset: () => setValue(''),
		bind: {
			value,
			onChange: event => {
				setValue(event.target.value);
			}
		}
	};
};
