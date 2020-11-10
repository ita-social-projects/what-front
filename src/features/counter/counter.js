import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { counterSelector, counterActions } from './redux/index.js';
import { useActions } from '../../shared/hooks/index.js';
import { ModalWindow } from '../modal-window/index.js';
import styles from './button.scss';


export const Counter = () => {
  const counter = useSelector(counterSelector, shallowEqual);
  const { incrementCounter, decrementCounter } = useActions(counterActions);

  const [toShowModal, setShowModal] = useState(false);

  const showModalHandler = () => setShowModal(true);

  const closeModalHandler = () => setShowModal(false);

  const submitModalHandler = () => {
    console.log('Modal submitted, something happened!');
    closeModalHandler();
  };

  return (
    <div>
      <h2>
        Test counter: {counter}
      </h2>
      <button className={"btn btn-primary"} type="button" onClick={incrementCounter}>Increment</button>
      <button className={styles.baseButton} type="button" onClick={decrementCounter}>Decrement</button>
      <button type="button" onClick={showModalHandler}>Show modal</button>
      <ModalWindow
        toShow={toShowModal}
        onSubmit={submitModalHandler}
        onClose={closeModalHandler}
      >
        *some action that you should confirm (or not confirm)*
      </ModalWindow>
    </div>
  );
};
