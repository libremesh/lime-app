import {
    LOCATION_CHANGE,
    LOCATION_LOAD,
    LOCATION_LOAD_LINKS,
    LOCATION_TOOGLE_EDIT,
    LOCATION_USER_SET,
} from "./locateConstants";

export const loadLocationLinks = () => ({
    type: LOCATION_LOAD_LINKS,
});

export const toogleEdit = (status) => ({
    type: LOCATION_TOOGLE_EDIT,
    payload: status,
});

export const loadLocation = () => ({
    type: LOCATION_LOAD,
});

export const changeLocation = (location) => ({
    type: LOCATION_CHANGE,
    payload: location,
});

export const setUserLocation = (location) => ({
    type: LOCATION_USER_SET,
    payload: location,
});
