import { createReducer } from 'redux-create-reducer';
import types from '../ActionTypes';
// Reducer handlers
import toggleMainMenu from './toggleMainMenu';

const initialState = {
	userData: {
		showMainMenu: false
	}
};

function createReducerInModule() {
	return createReducer(initialState, {
		[types.SHOW_MAIN_MENU]: toggleMainMenu
	});
}

export default {
	initialState,
	createReducerInModule
};
