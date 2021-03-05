const defaultConfig = {
  PORT: 3001
};

const validate = ({ PORT, MOCKS_FOLDER }) => {
  if (!PORT) {
    throw new Error('PORT must be defined!');
  }

  if (!MOCKS_FOLDER) {
    throw new Error('MOCKS_FOLDER must be defined!');
  }
};

export { defaultConfig, validate };
