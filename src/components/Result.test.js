import React from 'react';
import {shallow} from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import Result from './Result';

describe('<Result />', () => {
    it('Renders without crashing', () => {
        shallow(<Result year={2080} />);
    });

    it('Renders the year', () => {
        const year = 2060;
        const wrapper = shallow(<Result year={year} />);
        expect(wrapper.contains(<p className='result'>The earliest you can retire with 70% of your current income is {year}.</p>)).toEqual(true);
    });
});