import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import { counterSelector, counterActions } from './redux';
import { useActions } from "../../shared/hooks";


export const Counter = () => {
  const counter = useSelector(counterSelector, shallowEqual);
  const { incrementCounter, decrementCounter } = useActions(counterActions);

  return (
    <div>
      <h2>Test counter: {counter}</h2>
      <button onClick={incrementCounter}>Increment</button>
      <button onClick={decrementCounter}>Decrement</button>
    </div>
  );
};
