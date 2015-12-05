Editable = React.createClass({
    propTypes: {
        component: React.PropTypes.object.isRequired,
        isEditable: React.PropTypes.bool.isRequired,
        editAction: React.PropTypes.func.isRequired
    },
    getInitialState() {
        return {
            isEditing: false
        };
    },
    componentDidMount() {
        this.isEditingToggler = StateToggler.bind(this, 'isEditing');
    },
    component() {
        if (this.state.isEditing) {
            return (
                <input
                    type='text'
                    defaultValue={this.props.value}
                    ref={(ref) => {
                        this._input = ref;

                        if (ref) {
                            ref.getDOMNode().focus();
                        }
                    }}
                    onBlur={this.saveInput} />
            );
        } else {
            return this.props.component;
        }
    },
    saveInput() {
        this.props.editAction(this._input.getDOMNode().value, this.isEditingToggler);
    },
    edit() {
        if (this.props.isEditable && !this.state.isEditing) {
            return (
                <IconButton
                    type='pencil'
                    isUnstyled={true}
                    action={this.isEditingToggler}
                    additionalClasses='distant' />
            );
        }
    },
    render() {
        let containerClassName = 'editable-container';

        if (this.props.additionalClasses) {
            containerClassName += ' ' + this.props.additionalClasses;
        }

        return (
            <div className={containerClassName}>
                {this.component()}
                {this.edit()}
            </div>
        );
    }
});