import React from 'react';
import { shallow } from 'enzyme';

import Input from './input';

describe('input form component', () => {
    it('renders an input', () => {
        const input = shallow(<Input />);

        expect(input).toHaveDisplayName('input');
    });
});
