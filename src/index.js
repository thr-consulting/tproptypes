/**
 * Useful React PropType shortcuts
 * @module module:addons/TPropTypes
 */
import {PropTypes} from 'react';
import {createPropType} from 'react-custom-proptypes';
import schema from 'validate';
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
const routerLocationSchema = schema({
	hash: {type: 'string', required: true, message: 'hash must be a string and is required.'},
	key: {type: 'string', message: 'key must be a string.'},
	pathname: {type: 'string', required: true, message: 'pathname must be a string and is required.'},
	search: {type: 'string', required: true, message: 'search must be a string and is required.'},
	state: {type: 'object', required: true, message: 'state must be an object.'},
}, {strip: false});

const routerLocation = createPropType(
	prop => {
		const errs = routerLocationSchema.validate(prop);
		if (errs.length > 0) {
			throw new TypeError(`routerLocation.${errs[0].message}`);
		}
	},
);


/**
 * React Router props
 * @member router
 */
const routerSchema = schema({
	createHref: {type: 'function', required: true, message: 'createHref must be a function and is required.'},
	createKey: {type: 'function', required: true, message: 'createKey must be a function and is required.'},
	createLocation: {type: 'function', required: true, message: 'createLocation must be a function and is required.'},
	createPath: {type: 'function', required: true, message: 'createPath must be a function and is required.'},
	getCurrentLocation: {type: 'function', required: true, message: 'getCurrentLocation must be a function and is required.'},
	go: {type: 'function', required: true, message: 'go must be a function and is required.'},
	goBack: {type: 'function', required: true, message: 'goBack must be a function and is required.'},
	goForward: {type: 'function', required: true, message: 'goForward must be a function and is required.'},
	isActive: {type: 'function', required: true, message: 'isActive must be a function and is required.'},
	listen: {type: 'function', required: true, message: 'listen must be a function and is required.'},
	listenBefore: {type: 'function', required: true, message: 'listenBefore must be a function and is required.'},
	push: {type: 'function', required: true, message: 'push must be a function and is required.'},
	replace: {type: 'function', required: true, message: 'replace must be a function and is required.'},
	setRouteLeaveHook: {type: 'function', required: true, message: 'setRouteLeaveHook must be a function and is required.'},
	transitionTo: {type: 'function', required: true, message: 'transitionTo must be a function and is required.'},
	unsubscribe: {type: 'function', required: true, message: 'unsubscribe must be a function and is required.'},
});

const router = createPropType(
	prop => {
		const errs = routerSchema.validate(prop);
		if (errs.length > 0) {
			throw new TypeError(`router.${errs[0].message}`);
		}
	},
);


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
