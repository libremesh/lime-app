import {
	TOGGLE_MENU_BUTTON
} from './metaConstants';

export const changeBase = ( hostname ) => (dispatch, getState) => {
	if (typeof window !== 'undefined') {
		window.location.href = 'http://'+ hostname +'/app';
	}
};

export const toggleMenuButton = () => (dispatch) => {
	dispatch({
		type: TOGGLE_MENU_BUTTON
	});
};