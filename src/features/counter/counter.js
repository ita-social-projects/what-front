import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import { counterSelector, counterActions } from './redux';
import { useActions } from "../../shared/hooks";
import styles from "./Button.css";

export const Counter = () => {
  const counter = useSelector(counterSelector, shallowEqual);
  const { incrementCounter, decrementCounter } = useActions(counterActions);

  return (
    <div>
      <h2>Test counter: {counter}</h2>
      <button className={styles.baseButton} onClick={incrementCounter}>Increment</button>
      <button className={styles.baseButton} onClick={decrementCounter}>Decrement</button>
    </div>
  );
};
