import { createReducer } from 'redux-create-reducer';
import types from '../ActionTypes';
// Reducer handlers
import getSessionsSuccess from './getSessionsSuccess';

const initialState = {
	userData: {
		sessions: {
			byId: {},
			allIds: []
		}
	}
};

function createReducerInModule() {
	return createReducer(initialState, {
		[types.GET_SESSION_LIST]: getSessionsSuccess
	});
}

export default {
	initialState,
	createReducerInModule
};
