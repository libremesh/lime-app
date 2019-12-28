import {
	TOGGLE_MENU_BUTTON
} from './metaConstants';

export const changeBase = ( hostname ) => {
	if (typeof window !== 'undefined') {
		window.location.href = 'http://'+ hostname +'/app';
	}
	return {
		type: '__CHANGE_BASE'
	};
};

export const toggleMenuButton = (option) => ({
	type: TOGGLE_MENU_BUTTON,
	payload: option
});
