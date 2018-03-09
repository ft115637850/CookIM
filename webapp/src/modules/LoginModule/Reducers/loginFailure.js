import update from 'immutability-helper';

function loginFailure(state, action) {
	const { errMsg } = action.payload;
	return update(state, {
		userData: {
			$set: {
				token: null,
				errMsg,
				isAuthenticated: false
			}
		}
	});
}
export default loginFailure;
