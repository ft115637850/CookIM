import React from 'react';
import { Field } from 'redux-form';
import {Redirect} from 'react-router-dom';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import IconPerson from 'material-ui/svg-icons/maps/person-pin';
import IconLogin from 'material-ui/svg-icons/social/person';
import IconRegister from 'material-ui/svg-icons/social/person-add';
import IconKey from 'material-ui/svg-icons/communication/vpn-key';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import Strings from '../../strings';

const Title = () => (
	<div style={{fontSize: '18px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
		<img style={{paddingRight: '20px'}} height="35px" width="35px" src="cookim.svg"/>
		<span>CookIM - User login</span>
	</div>
);

const Footer = () => (
	<div style={{fontSize: '18px', textAlign: 'center'}}>© 2017 Copyright cookeem.com</div>
);

const RenderField = ({ input, label, type, meta: { touched, error } }) => (
	<div style={{flex: 1, paddingRight: '20px'}}>
		<TextField
			{...input}
			type={type}
			floatingLabelText={label}
			fullWidth={true}
		/>
		{touched && error && <span>{error}</span>}
	</div>
);

const style = {
	minHeight: 400,
	minWidth: 320,
	margin: 'auto',
	marginTop: 25,
	padding: '15px 15px 70px 15px'
};

class Login extends React.Component {
	render() {
		const { loginRequest, isAuthenticated, error, handleSubmit, pristine, reset, submitting } = this.props;
		const { from } = this.props.location.state || { from: { pathname: '/mainPage' } };
		if (isAuthenticated) {
			return (
				<Redirect to={from}/>
			);
		}

		return (
			<div style={{height: 'calc(-16px + 100vh)', display: 'flex', flexDirection: 'column'}}>
				<AppBar showMenuIconButton={false} title={<Title/>} />
				<Paper style={style} zDepth={2}>
					<form>
						<h2 style={{textAlign: 'center'}}>User login</h2>
						<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', maxWidth: '450px', margin: '0 auto'}}>
							<IconButton><IconPerson/></IconButton>
							<Field
								name="username"
								type="text"
								component={RenderField}
								label="Username"
							/>
						</div>
						<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', maxWidth: '450px', margin: '0 auto'}}>
							<IconButton><IconKey/></IconButton>
							<Field
								name="password"
								type="password"
								component={RenderField}
								label="Password"
							/>
						</div>
						<div style={{display: 'flex', flexDirection: 'row', maxWidth: '450px', padding: '15px 0 15px 17px', margin: '0 auto'}}>
							<Field
								name="rememberLogin"
								label={Strings.login.rememberLogin}
								component={Checkbox}
							/>
						</div>
						<div style={{display: 'flex', flexDirection: 'row', maxWidth: '450px', margin: '0 auto'}}>
							<div style={{paddingLeft: 50, flex: '1'}}>
								<RaisedButton label={Strings.login.login} icon={<IconLogin/>} primary={true} onClick={handleSubmit(loginRequest)} />
							</div>
							<div style={{width: 'auto', paddingRight: 20}}>
								<RaisedButton label={Strings.login.new} icon={<IconRegister/>} style={{width: '110px'}} primary={true} onClick={reset} />
							</div>
						</div>
					</form>
				</Paper>
				<AppBar showMenuIconButton={false} title={<Footer/>} />
			</div>
		);
	}
}

export default Login;
