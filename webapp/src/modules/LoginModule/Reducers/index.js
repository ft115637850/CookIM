import { createReducer } from 'redux-create-reducer';
import types from '../ActionTypes';
// Reducer handlers
import pingSuccess from './pingSuccess';
import pingFailure from './pingFailure';
import loginSuccess from './loginSuccess';
import loginFailure from './loginFailure';

const initialState = {
	userData: {
		pong: '',
		token: '',
		errMsg: undefined,
		isAuthenticated: false
	}
};

function createReducerInModule() {
	return createReducer(initialState, {
		[types.PING_SUCCESS]: pingSuccess,
		[types.PING_SUCCESS]: pingFailure,
		[types.LOGIN_SUCCESS]: loginSuccess,
		[types.LOGIN_FAILURE]: loginFailure
	});
}

export default {
	initialState,
	createReducerInModule
};
