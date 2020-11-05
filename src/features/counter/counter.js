import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import { counterSelector, counterActions } from './redux';
import { useActions } from '../../shared/hooks';
import { ModalWindow } from '../modal-window/modal-window';

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
      <button type="button" onClick={incrementCounter}>Increment</button>
      <button type="button" onClick={decrementCounter}>Decrement</button>
      <button type="button" onClick={showModalHandler}>Show modal</button>
      <ModalWindow
        toShow={toShowModal}
        submitHandler={submitModalHandler}
        closeHandler={closeModalHandler}
        cancelHandler={closeModalHandler}
      >
        *some action that you should confirm (or not confirm)*
      </ModalWindow>
    </div>
  );
};
