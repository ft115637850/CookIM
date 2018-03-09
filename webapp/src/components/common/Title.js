import React from 'react';

const Title = props => (
	<div style={{fontSize: '18px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
		<img style={{paddingRight: '20px'}} height="35px" width="35px" src="cookim.svg"/>
		<span>CookIM - {props.moduleName}</span>
	</div>
);

export default Title;
