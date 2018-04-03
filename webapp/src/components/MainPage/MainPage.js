import React from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import IconComfy from 'material-ui/svg-icons/image/view-comfy';
import IconPeople from 'material-ui/svg-icons/social/people';
import Title from '../common/Title';
import Footer from '../common/Footer';
import ChatsPublic from './ChatsPublic';

const style = {
	subheader: {
		fontSize: '18px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	content: {
		minHeight: 400,
		minWidth: 600,
		margin: 'auto',
		marginTop: 25,
		padding: '15px 15px 70px 15px'
	}
};

class MainPage extends React.Component {
	componentDidMount() {
	}

	render() {
		const {mainMenuVisibility, toggleMainMenu} = this.props;
		return (
			<div style={{height: 'calc(-16px + 100vh)', display: 'flex', flexDirection: 'column'}}>
				<AppBar showMenuIconButton={true} onLeftIconButtonClick={() => toggleMainMenu(!mainMenuVisibility)} title={<Title moduleName="Main Page"/>} />
				<Paper style={style.content} zDepth={2}>
					<ChatsPublic/>
				</Paper>
				<AppBar showMenuIconButton={false} title={<Footer/>} />
				<Drawer docked={false}
					width={230}
					open={mainMenuVisibility}
					onRequestChange={open => {
						toggleMainMenu(open);
					}}
				>
					<Subheader>
						<div style={style.subheader}>
							<IconComfy style={{color: 'gray'}}/>
							<span style={{ color: 'black', paddingLeft: '20px' }}>Main menu</span>
						</div>
					</Subheader>
					<MenuItem>Chats public</MenuItem>
					<MenuItem>Chats joined</MenuItem>
					<MenuItem>Friends</MenuItem>
					<MenuItem>Notifications</MenuItem>
					<Subheader>
						<div style={style.subheader}>
							<IconPeople style={{color: 'gray'}}/>
							<span style={{ color: 'black', paddingLeft: '20px' }}>Joined chat</span>
						</div>
					</Subheader>
				</Drawer>
			</div>
		);
	}
}
export default MainPage;
