export const showNotification = (msg) => (dispatch) => {
	dispatch({
		type: 'NOTIFICATION',
		payload: { msg }
	});
};

