import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import { addAlert } from '@/features';
import { counterSelector, counterIsLoadingSelector, counterActions } from './redux/index.js';
import { useActions, ApiService } from '../../shared/index.js';
import { ModalWindow } from '../modal-window/index.js';
import { Button, Search, WithLoading } from '../../components/index.js';
import {
  login, logOut, registretion, loadStudents,
} from '../../models/index.js';

export const Counter = () => {
  const counter = useSelector(counterSelector, shallowEqual);
  const isLoading = useSelector(counterIsLoadingSelector, shallowEqual);
  const { incrementCounter, decrementCounter, fetchCounter } = useActions(counterActions);
  const [fetchMentors] = useActions([loadStudents]);
  const [
    logIn,
    logout,
    regist,
    dispatchShowAlert,
  ] = useActions([login, logOut, registretion, addAlert]);
  const fetchStudents = useActions(loadStudents);
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

  const auth = async () => {
    await ApiService.create('/accounts/auth', {
      email: 'admin.@gmail.com',
      password: 'admin',
    });
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
          <Button onClick={auth}>Auth</Button>
          <Button onClick={fetchCounter} variant="primary">Fetch counter</Button>
          <Button onClick={fetchMentors} variant="primary">Fetch mentors</Button>
          <Button onClick={() => dispatchShowAlert('Hello from counter')}>Show alert</Button>
          <Button onClick={() => dispatchShowAlert('Hello blablabla', 'success', 5000)} variant="dark">Show alert</Button>
          <Button onClick={() => logIn({ email: 'admin.@gmail.com', password: 'admin' })} variant="primary">LogIn</Button>
          <Button onClick={() => logout()} variant="primary">LogOut</Button>
          <Button
            onClick={() => regist({
              email: 'example2@example.com', firstName: 'Bob', lastName: 'Marley', password: 'qwerty1!', confirmPassword: 'qwerty1!' })}
            variant="primary"
          >
            Regist
          </Button>
          <Button onClick={fetchStudents} variant="primary">Fetch students</Button>
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
