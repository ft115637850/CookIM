import React from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
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
		//this.props.getContent();
	}

	render() {
		return (
			<div style={{height: 'calc(-16px + 100vh)', display: 'flex', flexDirection: 'column'}}>
				<AppBar showMenuIconButton={false} title={<Title moduleName="User login"/>} />
				<Paper style={style} zDepth={2}>
				</Paper>
				<AppBar showMenuIconButton={false} title={<Footer/>} />
			</div>
		);
	}
}
export default MainPage;
