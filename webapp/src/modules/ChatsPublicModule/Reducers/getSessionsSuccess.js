import update from 'immutability-helper';

function addSessionToState(state, sessionInfo) {
	const { sessionid } = sessionInfo;
	return update(state, {
		entities: {
			nodesInfo: {
				byId: {
					[sessionid]: {
						$set: sessionInfo
					}
				},
				allIds: { $push: [sessionid] }
			}
		}
	});
}

function getSessionsSuccess(state, action) {
	const { sessions } = action.payload;
	let newState = update(state, {
		userData: {
			sessions: {
				byId: { $set: {} },
				allIds: { $set: [] }
			}
		}
	});

	sessions.forEach(sessionInfo => {
		newState = addSessionToState(newState, sessionInfo);
	});

	return newState;
}
export default getSessionsSuccess;
