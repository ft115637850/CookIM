import React from 'react';
import { connect } from 'react-redux';
import {
	Route,
	Redirect,
	withRouter
} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const mapDispatchToProps = () => {
	return {
		isAuthenticated: () => {
			const token = cookies.get('token');
			if (token === undefined) {
				return false;
			}
			const decoded = jwtDecode(token, {header: true});
			if (decoded.uid === undefined || decoded.uid === '') {
				return false;
			}
			return true;
		}
	};
};

class PrivateRoute extends React.Component {
	render() {
		const { component: Component, isAuthenticated, ...rest } = this.props;
		return (
			<Route {...rest} render={props => (
				isAuthenticated() ? (
					<Component {...props}/>
				) : (
					<Redirect to={{
						pathname: '/login',
						state: { from: props.location }
					}}
					/>
				)
			)}
			/>
		);
	}
}

export default withRouter(connect(null, mapDispatchToProps)(PrivateRoute));
