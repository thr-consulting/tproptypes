// @flow

import PropTypes from 'prop-types';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import keys from 'lodash/keys';
import some from 'lodash/some';
import every from 'lodash/every';

function invalidProp(propName, componentName, expected) {
	return new Error(`Invalid prop \`${propName.toString()}\` supplied to \`${componentName.toString()}\`, expected ${expected.toString()}.`);
}

/**
 * React Router v4 Location object
 */
const location = PropTypes.shape({
	hash: PropTypes.string.isRequired,
	key: PropTypes.string,
	pathname: PropTypes.string.isRequired,
	search: PropTypes.string.isRequired,
	state: PropTypes.object,
});

/**
 * React Router v4 History
 */
const history = PropTypes.shape({
	action: PropTypes.string.isRequired,
	block: PropTypes.func,
	createHref: PropTypes.func,
	go: PropTypes.func,
	goBack: PropTypes.func,
	goForward: PropTypes.func,
	length: PropTypes.number,
	listen: PropTypes.func,
	location,
	push: PropTypes.func,
	replace: PropTypes.func,
});

/**
 * React Component - Either an element or a function
 */
const reactComponent = PropTypes.oneOfType([
	PropTypes.element,
	PropTypes.func,
]);

/**
 * React children elements
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
const sFieldMessages = (props: Object, propName: String, componentName: String) => {
	const prop = props[propName];
	let isOk = isObject(prop);
	if (keys(prop).length > 0) {
		isOk = isOk && some(keys(prop), key => {
			if (!isArray(prop[key])) return false;
			return every(prop[key], value => (isString(value.message) && isObject(value.values)));
		});
	}
	if (!isOk) return invalidProp(propName, componentName, String('react-input-message.connectToMessageContainer messages'));
	return null;
};

/**
 * A string or a number
 */
const stringOrNumber = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.number,
]);

/**
 * JS Money object
 */
const money = PropTypes.shape({
	amount: PropTypes.number.isRequired,
	currency: PropTypes.string.isRequired,
});

/**
 * JS Joda Local Date
 */
const localDate = PropTypes.shape({
	_day: PropTypes.number.isRequired,
	_month: PropTypes.number.isRequired,
	_year: PropTypes.number.isRequired,
});

export default {
	location,
	history,
	reactComponent,
	reactElements,
	sFieldMessages,
	stringOrNumber,
	money,
	localDate,
};
