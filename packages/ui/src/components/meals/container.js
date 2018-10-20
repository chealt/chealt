import { connect } from 'react-redux';

import Meals from './';

const mapState = ({ meals }) => ({
    meals
});

export default connect(mapState)(Meals);
