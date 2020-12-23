export { secretariesReducer } from './reducer.js';
export {
  fetchSecretaries, createSecretary, updateSecretary, deleteSecretary, secretariesWatcher,
} from './actions.js';
export {
  secretariesSelector, createdSecretarySelector, updatedSecretarySelector, deletedSecretarySelector,
} from './selectors.js';