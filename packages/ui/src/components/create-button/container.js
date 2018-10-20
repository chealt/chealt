import { connect } from 'react-redux';

import CreateButton from './';
import { showCreateItem } from '../app.actions';

const mapState = ({ views: { currentView } }) => ({
    currentView
});

const mapDispatch = {
    showCreateItem
};

export default connect(mapState, mapDispatch)(CreateButton);
