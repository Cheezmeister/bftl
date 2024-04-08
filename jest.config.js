// NOTE: https://stackoverflow.com/questions/73203367/jest-syntaxerror-unexpected-token-export-with-uuid-library
module.exports = {
  setupFiles: ['jest.setup.js'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {"^uuid$": "uuid"},
  transform: {},
  preset: 'react-native',
};
