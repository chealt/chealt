import { connect } from 'react-redux';

import Feelings from './Feelings';

const mapState = ({ feelings }) => ({
    feelings
});

export default connect(mapState)(Feelings);
