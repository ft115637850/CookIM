import React from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Title from '../common/Title';
import Footer from '../common/Footer';

const style = {
	minHeight: 400,
	minWidth: 320,
	margin: 'auto',
	marginTop: 25,
	padding: '15px 15px 70px 15px'
};

class MainPage extends React.Component {
	componentDidMount() {
	}

	render() {
		const {mainMenuVisibility, toggleMainMenu} = this.props;
		return (
			<div style={{height: 'calc(-16px + 100vh)', display: 'flex', flexDirection: 'column'}}>
				<AppBar showMenuIconButton={true} onLeftIconButtonClick={() => toggleMainMenu(!mainMenuVisibility)} title={<Title moduleName="Main Page"/>} />
				<Paper style={style} zDepth={2}>
				</Paper>
				<AppBar showMenuIconButton={false} title={<Footer/>} />
				<Drawer docked={false}
					width={230}
					open={mainMenuVisibility}
					onRequestChange={open => {
						toggleMainMenu(open);
					}}
				>
					<MenuItem>Menu Item</MenuItem>
					<MenuItem>Menu Item 2</MenuItem>
				</Drawer>
			</div>
		);
	}
}
export default MainPage;
