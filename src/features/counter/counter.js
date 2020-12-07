import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import {
  login, logOut, registretion, fetchUsersList, fetchUnAssignedUserList,
} from '@/models/index.js';
import { counterSelector, counterIsLoadingSelector, counterActions } from './redux/index.js';
import { useActions } from '../../shared/hooks/index.js';
import { ModalWindow } from '../modal-window/index.js';
import { Button, Search, WithLoading } from '../../components/index.js';
import { loadMentors } from '../../models/index.js';

export const Counter = () => {
  const counter = useSelector(counterSelector, shallowEqual);
  const isLoading = useSelector(counterIsLoadingSelector, shallowEqual);
  const { incrementCounter, decrementCounter, fetchCounter } = useActions(counterActions);
  const [fetchMentors] = useActions([loadMentors]);
  const [logIn, logout, regist, usersList, unAssignedUserList] =   useActions([login, logOut, registretion, fetchUsersList, fetchUnAssignedUserList]);
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

          <Button onClick={() => logIn({ email: 'admin.@gmail.com', password: 'admin' })} variant="primary">LogIn</Button>
          <Button onClick={() => logout()} variant="primary">LogOut</Button>
          <Button onClick={() => usersList()} variant="primary">Assigned</Button>
          <Button onClick={() => unAssignedUserList()} variant="primary">UnAssigned</Button>
          <Button
            onClick={() => regist({
              email: 'example2@example.com', firstName: 'Bob', lastName: 'Marley', password: 'qwerty1!', confirmPassword: 'qwerty1!'})}
            variant="primary"
          >Regist
          </Button>
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
