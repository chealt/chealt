import React from 'react';
import { shallow } from 'enzyme';

import Home from './home';

describe('Home component', () => {
    const render = () => shallow(
        <Home />
    );

    it('renders the home container', () => {
        const home = render();

        expect(home).toHaveProp('id', 'home');
    });

    it('renders a heading with the page title', () => {
        const home = render();
        const heading = home.find('h1');

        expect(heading).toHaveText('Homepage');
    });
});
