import React from 'react';
import { node } from 'prop-types';

const Header = ({ children }) => (
    <header className="margin--l">{children}</header>
);

Header.propTypes = {
    children: node.isRequired
};

export default Header;
