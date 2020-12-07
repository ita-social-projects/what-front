export { secretariesReducer } from './reducer.js';
export {
  fetchSecretaries, createSecretary, updateSecretary, deleteSecretary, secretariesWatcher,
} from './actions.js';
export { secretariesSelector, secretariesIsLoading, secretariesLoaded } from './selectors.js';