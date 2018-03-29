import Cookies from 'universal-cookie';
import { ApiClient, ListSessionsApi } from '../../../api-client/src';
import actionCreators from './ActionCreators';

const cookies = new Cookies();

function getSessionList() {
	return dispatch => {
		ApiClient.instance.authentications.oauth.accessToken = cookies.get('token');
		const listSessionsApi = new ListSessionsApi();
		listSessionsApi.listSessions('public')
			.then(result => dispatch(actionCreators.getSessionListSuccess(result.sessions)))
			.catch(result => {
				throw new Error(result);
			});
	};
}

export default {
	getSessionList
};
