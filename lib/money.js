// @flow

import PropTypes from 'prop-types';

/**
 * JS Money object
 */
export const money = PropTypes.shape({
	amount: PropTypes.number.isRequired,
	currency: PropTypes.string.isRequired,
});
