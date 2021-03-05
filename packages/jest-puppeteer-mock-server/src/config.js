const defaultConfig = {
  PORT: 3001
};

const validate = ({ PORT }) => {
  if (!PORT) {
    throw new Error('PORT must be defined!');
  }
};

export { defaultConfig, validate };
