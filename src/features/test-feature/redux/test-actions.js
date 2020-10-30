import { testActionTypes } from './test-types';

export const addOne = () => ({
  type: testActionTypes.ADD_ONE
});

export const subtractOne = () => ({
  type: testActionTypes.SUBTRACT_ONE
});
