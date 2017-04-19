/**
 * Useful React PropType shortcuts
 * @module module:addons/TPropTypes
 */
import PropTypes from 'prop-types';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import keys from 'lodash/keys';
import some from 'lodash/some';
import every from 'lodash/every';

function invalidProp(propName, componentName, expected) {
	return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`, expected ${expected}.`);
}

/**
 * React Router Location object
 * @member routerLocation
 */
const routerLocation = PropTypes.shape({
	hash: PropTypes.string.isRequired,
	key: PropTypes.string,
	pathname: PropTypes.string.isRequired,
	search: PropTypes.string.isRequired,
	state: PropTypes.object,
});

/**
 * React Router props
 * @member router
 */
const router = PropTypes.shape({
	createHref: PropTypes.func.isRequired,
	createKey: PropTypes.func.isRequired,
	createLocation: PropTypes.func.isRequired,
	createPath: PropTypes.func.isRequired,
	getCurrentLocation: PropTypes.func.isRequired,
	go: PropTypes.func.isRequired,
	goBack: PropTypes.func.isRequired,
	goForward: PropTypes.func.isRequired,
	isActive: PropTypes.func.isRequired,
	listen: PropTypes.func.isRequired,
	listenBefore: PropTypes.func.isRequired,
	push: PropTypes.func.isRequired,
	replace: PropTypes.func.isRequired,
	setRouteLeaveHook: PropTypes.func.isRequired,
	transitionTo: PropTypes.func.isRequired,
	unsubscribe: PropTypes.func.isRequired,
});

/**
 * React children elements
 * @member reactElements
 */
const reactElements = PropTypes.oneOfType([
	PropTypes.arrayOf(PropTypes.element),
	PropTypes.element,
]);

/**
 * SField error messages
 * @param {object} props
 * @param {string} propName
 * @param {string} componentName
 * @returns {*}
 */
const sFieldMessages = (props, propName, componentName) => {
	const prop = props[propName];
	let isOk = isObject(prop);
	if (keys(prop).length > 0) {
		isOk = isOk && some(keys(prop), key => {
				if (!isArray(prop[key])) return false;
				return every(prop[key], value => (isString(value.message) && isObject(value.values)));
			});
	}
	if (!isOk) return invalidProp(propName, componentName, 'react-input-message.connectToMessageContainer messages');
	return null;
};

const stringOrNumber = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.number,
]);

/**
 * Standard User object
 * @member user
 */
const user = PropTypes.shape({
	_id: PropTypes.string.isRequired,
	profile: PropTypes.shape({
		name: PropTypes.string.isRequired,
		firstName: PropTypes.string.isRequired,
		lastName: PropTypes.string,
	}),
	roles: PropTypes.arrayOf(PropTypes.string),
	emails: PropTypes.arrayOf(PropTypes.shape({
		address: PropTypes.string.isRequired,
		verified: PropTypes.bool.isRequired,
	})),
});

/**
 * JS Money object
 * @member money
 */
const money = PropTypes.shape({
	amount: PropTypes.number.isRequired,
	currency: PropTypes.string.isRequired,
});

const localDate = PropTypes.shape({
	_day: PropTypes.number.isRequired,
	_month: PropTypes.number.isRequired,
	_year: PropTypes.number.isRequired,
});

export default {
	routerLocation,
	router,
	reactElements,
	sFieldMessages,
	stringOrNumber,
	user,
	money,
	localDate,
};
