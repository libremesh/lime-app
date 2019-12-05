import {
	GET_NODE_STATUS,
	TIMER_STOP,
	TIMER_START
} from './rxConstants';

import { push } from 'preact-router-redux';

export const getNodeStatus = () => ({
	type: GET_NODE_STATUS,
	payload: {}
});

export const getNodeStatusTimer =  () => ({
	type: TIMER_START,
	payload: {}
});

export const stopTimer = () => ({
	type: TIMER_STOP
});

export const changeNode = (hostname) => {
	console.log(push('changeNode/'+hostname));
	return {
		type: 'change_base'
	};
};