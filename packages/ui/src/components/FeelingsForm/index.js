import { connect } from 'react-redux';

import { formSerializer } from '@chealt/component-library';

import FeelingsForm from './FeelingsForm';

import { save } from './actions';

const mapDispatch = (dispatch) => ({
    saveFeeling: (event) => {
        const formElement = event.target;
        const serializedForm = formSerializer(formElement);

        dispatch(save(serializedForm.inputs.feeling));
    }
});

export default connect(null, mapDispatch)(FeelingsForm);
