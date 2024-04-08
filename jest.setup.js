// NOTE: https://github.com/invertase/react-native-async-storage/blob/master/docs/Jest-integration.md
console.log('Jest setup file loaded!');
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
