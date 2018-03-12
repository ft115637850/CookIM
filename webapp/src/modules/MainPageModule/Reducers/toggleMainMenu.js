import update from 'immutability-helper';

function toggleMainMenu(state, action) {
	const { toShow } = action.payload;
	return update(state, {
		userData: {
			$set: {
				showMainMenu: toShow
			}
		}
	});
}
export default toggleMainMenu;
