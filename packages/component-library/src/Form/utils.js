const elementsArrayToMap = (inputs, { name, value }) => {
    inputs[name] = value;

    return inputs;
};

const serializer = (formElement) => {
    const { name, elements } = formElement;

    return {
        name,
        inputs: Array.from(elements).reduce(elementsArrayToMap, {})
    };
};

export { serializer };
