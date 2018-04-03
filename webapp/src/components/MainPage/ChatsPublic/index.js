import { connect } from 'react-redux';
import ChatsPublic from './ChatsPublic';
import ChatsPublicModule from '../../../modules/ChatsPublicModule';
const { selectors, actions } = ChatsPublicModule;

const mapStateToProps = state => {
	return {
		publicSessions: selectors.allSessions(state)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getPublicSessions: () => dispatch(actions.getSessionList())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatsPublic);
