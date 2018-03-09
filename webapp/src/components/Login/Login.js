import React from 'react';
import { Field } from 'redux-form';
import {Redirect} from 'react-router-dom';
import Snackbar from 'material-ui/Snackbar';
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
import Title from '../common/Title';
import Footer from '../common/Footer';
import {email, maxLength, minLength} from '../common/validations';

const minLength6 = minLength(6);
const maxLength18 = maxLength(18);

const RenderField = ({ input, label, type, meta: { touched, error } }) => (
	<div style={{flex: 1, paddingRight: '20px'}}>
		<TextField
			{...input}
			type={type}
			floatingLabelText={label}
			fullWidth={true}
			errorText={touched && error}
		/>
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
		const { loginRequest, isAuthenticated, errMsg, handleSubmit, pristine, reset, submitting, clearLoginErr } = this.props;
		const { from } = this.props.location.state || { from: { pathname: '/mainPage' } };
		if (isAuthenticated) {
			return (
				<Redirect to={from}/>
			);
		}

		return (
			<div style={{height: 'calc(-16px + 100vh)', display: 'flex', flexDirection: 'column'}}>
				<AppBar showMenuIconButton={false} title={<Title moduleName="User login"/>} />
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
								validate={email}
							/>
						</div>
						<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', maxWidth: '450px', margin: '0 auto'}}>
							<IconButton><IconKey/></IconButton>
							<Field
								name="password"
								type="password"
								component={RenderField}
								label="Password"
								validate={[maxLength18, minLength6]}
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
								<RaisedButton label={Strings.login.login} icon={<IconLogin/>} primary={true} onClick={handleSubmit(loginRequest)} disabled={pristine || submitting}/>
							</div>
							<div style={{width: 'auto', paddingRight: 20}}>
								<RaisedButton label={Strings.login.new} icon={<IconRegister/>} style={{width: '110px'}} primary={true} onClick={reset} disabled={submitting}/>
							</div>
						</div>
					</form>
				</Paper>
				<Snackbar
					open={errMsg !== undefined}
					message={errMsg || ''}
					autoHideDuration={4000}
					onRequestClose={clearLoginErr}
				/>
				<AppBar showMenuIconButton={false} title={<Footer/>} />
			</div>
		);
	}
}

export default Login;
