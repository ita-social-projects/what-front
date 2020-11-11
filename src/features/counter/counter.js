import React, { useRef, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import { counterSelector, counterActions } from './redux/index.js';
import { useActions } from '../../shared/hooks/index.js';
import { ModalWindow } from '../modal-window/index.js';
import { Search } from '../../components/search/search.js';
import styles from './button.scss';

export const Counter = () => {
  const counter = useSelector(counterSelector, shallowEqual);
  const { incrementCounter, decrementCounter } = useActions(counterActions);

  const [toShowModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  const handleSubmitModal = () => {
    console.log('Modal submitted, something happened!');
    handleCloseModal();
  };

  const searchRef = useRef();

  const handleSearch = () => {
    console.log(`Search value = ${searchRef.current.value}`);
  };

  return (
    <div>
      <h2>
        Test counter: {counter}
      </h2>
      <button className={styles.baseButton} type="button" onClick={incrementCounter}>Increment</button>
      <button className={styles.baseButton} type="button" onClick={decrementCounter}>Decrement</button>
      <button type="button" onClick={handleShowModal}>Show modal</button>
      <div className="m-3">
        <Search
          onSearch={handleSearch}
          inputRef={searchRef}
          placeholder="Search something"
        />
      </div>
      <ModalWindow
        toShow={toShowModal}
        onSubmit={handleSubmitModal}
        onClose={handleCloseModal}
      >
        *some action that you should confirm (or not confirm)*
      </ModalWindow>
    </div>
  );
};
