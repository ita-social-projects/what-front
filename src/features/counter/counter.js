import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import { counterSelector, counterIsLoadingSelector, counterActions } from './redux/index.js';
import { useActions } from '../../shared/hooks/index.js';
import { ModalWindow } from '../modal-window/index.js';
import { Button, Search, WithLoading } from '../../components/index.js';
import {
  loadMentors
} from '../../models/index.js';
import {ApiService} from "@/shared";

export const Counter = () => {
  const counter = useSelector(counterSelector, shallowEqual);
  const isLoading = useSelector(counterIsLoadingSelector, shallowEqual);
  const { incrementCounter, decrementCounter, fetchCounter } = useActions(counterActions);
  const [fetchMentors] = useActions([loadMentors]);
  const [toShowModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  const handleSubmitModal = () => {
    console.log('Modal submitted, something happened!');
    handleCloseModal();
  };

  const handleSearch = (inputValue) => {
    console.log(`Search value = ${inputValue}`);
  };

  return (
    <WithLoading isLoading={isLoading}>
      <div>
        <div>
          <h2>
            Test counter: {counter}
          </h2>
          <Button type="button" onClick={incrementCounter}>Increment</Button>
          <Button type="button" onClick={decrementCounter} variant="warning">Decrement</Button>
          <Button type="button" onClick={handleShowModal} variant="success">Show modal</Button>
          <Button onClick={fetchCounter} variant="primary">Fetch counter</Button>
          <Button onClick={fetchMentors} variant="primary">Fetch mentors</Button>
        </div>
        <div className="m-3">
          <Search
            onSearch={handleSearch}
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
    </WithLoading>
  );
};
