import types from '../ActionTypes';

function getSessionListSuccess(sessions) {
	return {
		type: types.GET_SESSION_LIST,
		payload: {
			sessions
		}
	};
}

export default {
	getSessionListSuccess
};
