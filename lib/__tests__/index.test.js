import React from 'react';
import {shallow} from 'enzyme';
import {LocalDate} from 'js-joda';
import Money from 'js-money';
import TPropTypes from '..';

describe('Router Location', () => {
	const Comp = props => (
		<div>
			{props.location.hash}
			{props.location.key}
			{props.location.pathname}
			{props.location.search}
		</div>
	);
	Comp.propTypes = {
		location: TPropTypes.location.isRequired,
	};

	it('renders without error', () => {
		expect(shallow(
			<Comp
				location={{
					hash: '#myhash',
					pathname: '/this/is/my/path',
					search: '?var=123',
					state: {},
				}}
			/>,
		)).toMatchSnapshot();
	});
});

describe('RouterHistory', () => {
	const Comp = props => (
		<div>
			{props.history.action}
			{props.history.length}
		</div>
	);
	Comp.propTypes = {
		history: TPropTypes.history.isRequired,
	};

	it('renders without error', () => {
		expect(shallow(
			<Comp
				history={{
					action: 'PUSH',
					length: 15,
				}}
			/>,
		)).toMatchSnapshot();
	});
});

describe('Local Date', () => {
	const Comp = props => (
		<div>
			{props.date.toString()}
		</div>
	);
	Comp.propTypes = {date: TPropTypes.localDate};

	it('renders without error', () => {
		expect(shallow(<Comp date={LocalDate.of(2017, 6, 23)}/>)).toMatchSnapshot();
	});
});

describe('Money', () => {
	const Comp = props => (
		<div>
			{props.money.amount} {props.money.currency}
		</div>
	);
	Comp.propTypes = {money: TPropTypes.money};

	it('renders without error', () => {
		expect(shallow(<Comp money={new Money(500, Money.CAD)}/>)).toMatchSnapshot();
	});
});

describe('String or Number', () => {
	const Comp = props => (
		<div>
			{props.string} {props.num}
		</div>
	);
	Comp.propTypes = {
		string: TPropTypes.stringOrNumber,
		num: TPropTypes.stringOrNumber,
	};

	it('renders without error', () => {
		expect(shallow(<Comp string="blah" num={5}/>)).toMatchSnapshot();
	});
});
