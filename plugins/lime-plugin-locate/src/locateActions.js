import {
	LOCATION_LOAD,
	LOCATION_LOAD_LINKS,
	LOCATION_CHANGE,
	LOCATION_USER_SET
} from './locateConstants';

export const loadLocationLinks = ( ) => (dispatch, getState) => {
	dispatch({
		type: LOCATION_LOAD_LINKS
	});
};

export const loadLocation = ( ) => (dispatch, getState) => {
	dispatch({
		type: LOCATION_LOAD
	});
};

export const changeLocation = ( location ) => (dispatch, getState) => {
	dispatch({
		type: LOCATION_CHANGE,
		payload: location
	});
};

export const setUserLocation = (location) => (dispatch) => {
	dispatch({
		type: LOCATION_USER_SET,
		payload: location
	});
};
