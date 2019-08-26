import React from 'react';
import { node } from 'prop-types';

const Header = ({ children }) => <header>{children}</header>;

Header.propTypes = {
    children: node.isRequired
};

export default Header;
