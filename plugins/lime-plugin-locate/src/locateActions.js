import {
	LOCATION_LOAD,
	LOCATION_LOAD_LINKS,
	LOCATION_CHANGE,
	LOCATION_USER_SET
} from './locateConstants';

export const loadLocationLinks = ( ) => ({
	type: LOCATION_LOAD_LINKS
});


export const loadLocation = ( ) => ({
	type: LOCATION_LOAD
});

export const changeLocation = ( location ) => ({
	type: LOCATION_CHANGE,
	payload: location
});

export const setUserLocation = (location) => ({
	type: LOCATION_USER_SET,
	payload: location
});
