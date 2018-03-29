import { NAME } from './constants';
import { createSelector } from 'reselect';

const getStateSlice = state => state[NAME];
const getById = state => getStateSlice(state).userData.sessions.byId;
const getAllIds = state => getStateSlice(state).userData.sessions.allIds;
const allSessions = createSelector(
	getById,
	getAllIds,
	(sessions, ids) => {
		return ids.map(id => {
			return {
				sessionid: sessions[id].sessionid,
				createuid: sessions[id].createuid,
				ouid: sessions[id].ouid,
				sessionName: sessions[id].sessionName,
				sessionType: sessions[id].sessionType,
				sessionIcon: sessions[id].sessionIcon,
				publicType: sessions[id].publicType,
				lastUpdate: sessions[id].lastUpdate,
				dateline: sessions[id].dateline,
				newCount: sessions[id].newCount,
				message: sessions[id].message
			};
		});
	}
);

export default { allSessions };
