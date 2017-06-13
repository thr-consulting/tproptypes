import React from 'react';
import TPropTypes from '../lib';
import {LocalDate} from 'js-joda';
import Money from 'js-money';

before(() => {
	sinon.stub(console, 'error').callsFake(warning => {
		throw new Error(warning);
	})
});
after(() => {
	console.error.restore()
});

describe('Router Location', () => {
	function RouterLocationComponent(props) { return <div/>; }
	RouterLocationComponent.propTypes = {
		routerLocation: TPropTypes.routerLocation.isRequired,
	};

	it('renders without error', () => {
		shallow(<RouterLocationComponent routerLocation={{
			hash: '',
			pathname: '/',
			search: ',',
			state: {}
		}}/>);
	});
});

describe('Local Date', () => {
	function Comp(props) { return <div/>; }
	Comp.propTypes = { date: TPropTypes.localDate };

	it('renders without error', () => {
		shallow(<Comp date={LocalDate.now()}/>);
	});
});

describe('Money', () => {
	function Comp(props) { return <div/>; }
	Comp.propTypes = { money: TPropTypes.money };

	it('renders without error', () => {
		shallow(<Comp money={new Money(500, Money.CAD)}/>);
	});
});

describe('String or Number', () => {
	function Comp(props) { return <div/>; }
	Comp.propTypes = {
		string: TPropTypes.stringOrNumber,
		num: TPropTypes.stringOrNumber,
	};

	it('renders without error', () => {
		shallow(<Comp string="blah" num={5} />);
	});
});
