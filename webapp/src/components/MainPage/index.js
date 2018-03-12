import { connect } from 'react-redux';
import MainPage from './MainPage';
import MainPageModule from '../../modules/MainPageModule';
const { selectors, actions } = MainPageModule;

const mapStateToProps = state => {
	return {
		mainMenuVisibility: selectors.getMainMenuVisibility(state)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		toggleMainMenu: toShow => dispatch(actions.showMainMenu(toShow))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
