import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import { counterSelector, counterActions } from './redux/index.js';
import { useActions } from '../../shared/hooks/index.js';
import { ModalWindow } from '../modal-window/index.js';
import { Button } from '../../components/Button/index.js';
import styles from './counter.module.scss';

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
      <Button type="button" onClick={incrementCounter}>Increment</Button>
      <Button type="button" onClick={decrementCounter}>Decrement</Button>
      <Button type="button" onClick={showModalHandler} additionalCssClasses={[styles.button, 'btn-success']}>Show modal</Button>
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
