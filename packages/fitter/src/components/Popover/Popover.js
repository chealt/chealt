import { h } from 'preact';

import { Card, CardBody } from '../Card';

import style from './style.css';

const Popover = ({ isOpen, children }) => (
  <div class={`${style.popover} showup ${isOpen ? 'open' : ''}`}>
    <Card hasShadow>
      <CardBody>
        {children}
      </CardBody>
    </Card>
  </div>
);

export default Popover;
