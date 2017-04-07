import React, {Component, PropTypes} from 'react';
import TPropTypes from '../lib';

class Demo extends Component {
	static propTypes = {
		routerLocation: TPropTypes.routerLocation,
	};

	render() {
		return (
			<div>TPropTypes Demo</div>
		)
	}
}

ReactDOM.render((
	<Demo
		routerLocation={{hash: 'blah'}}
	/>
), document.getElementById('root'));
