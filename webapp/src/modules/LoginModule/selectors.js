import { NAME } from './constants';

const getStateSlice = state => state[NAME];
const getPingResult = state => getStateSlice(state).userData.pong;
const isAuthenticated = state => getStateSlice(state).userData.isAuthenticated;
const getErrMsg = state => getStateSlice(state).userData.errMsg;

export default { getPingResult, isAuthenticated, getErrMsg };
