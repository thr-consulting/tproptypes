// @flow

import PropTypes from 'prop-types';

/**
 * JS Joda Local Date
 */
export const localDate = PropTypes.shape({
	_day: PropTypes.number.isRequired,
	_month: PropTypes.number.isRequired,
	_year: PropTypes.number.isRequired,
});
