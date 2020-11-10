import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import { counterSelector, counterActions } from './redux';
import { useActions } from "../../shared/hooks";
import styles from './button.scss'
import { FaBeer } from 'react-icons/fa';

export const Counter = () => {
  const counter = useSelector(counterSelector, shallowEqual);
  const { incrementCounter, decrementCounter } = useActions(counterActions);

  return (
    <div>
      <h2>Test counters: {counter}</h2>
      <button className={styles.baseButton} onClick={incrementCounter}>Increment</button>
      <button className={styles.baseButton} onClick={decrementCounter}>Decrement</button>
      <h3> Lets go for a <FaBeer />? </h3>
    </div>
  );
};
