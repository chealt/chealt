StateToggler = function (statePropertyName) {
    let tempObject = {};
    tempObject[statePropertyName] = !this.state[statePropertyName];
    this.setState(tempObject);
};
