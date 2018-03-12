import types from '../ActionTypes';

function showMainMenu(toShow) {
	return {
		type: types.SHOW_MAIN_MENU,
		payload: {
			toShow
		}
	};
}

function getContentSuccess(friends) {
	return {
		type: types.GET_CONTENT_SUCCESS,
		payload: {
			friends: friends
		}
	};
}
export default {
	getContentSuccess,
	showMainMenu
};
