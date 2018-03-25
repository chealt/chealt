import React from 'react';
import { shallow } from 'enzyme';

import { render } from './index';

import Home from './home';

jest.mock('./home', () => jest.fn());

describe('Index component', () => {
    it('renders the home component', () => {
        const home = <div className="home" />;
        Home.mockReturnValue(home);
        const SUT = render();

        expect(shallow(SUT).find('.home')).toExist();
    });
});
