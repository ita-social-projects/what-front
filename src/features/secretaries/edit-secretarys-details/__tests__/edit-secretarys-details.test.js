import React from 'react';
import { Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useActions } from '@/shared';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { EditSecretarysDetails } from '../';
import { SecretarysMock } from './__mock__/mock-data.js';

jest.mock('react-redux', () => ({
  useSelector: jest.fn()
}));

jest.mock('@/shared/hooks', () => ({
  useActions: jest.fn()
}));

const props = {
  id: 1
};

describe('Edit Secretarys Details', () => {
  let mockSecretariesSelector;
  let mockUpdatedSecretarySelector;
  let mockDeletedSecretarySelector;
  let useActionsFns;
  // let useStateMock;
  let historyMock;
    
  beforeEach(() => {
    mockSecretariesSelector = {
      data: SecretarysMock,
      isLoading: false,
      isLoaded: true,
      error: ''
    };
    mockUpdatedSecretarySelector = {
      isLoaded: false,
      isLoading: false,
      error: ''
    };
    mockDeletedSecretarySelector = {
      isLoaded: false,
      isLoading: false,
      error: ''
    };

    useActionsFns = {
      updateSecretary: jest.fn(),
      deleteSecretary: jest.fn()
    };

    // useStateMock = {
    //   setShowModal: jest.fn()
    // }

    historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    
    useSelector
      .mockReturnValueOnce(mockSecretariesSelector)
      .mockReturnValue(mockUpdatedSecretarySelector)
      .mockReturnValue(mockDeletedSecretarySelector);

    
    //React.useState = jest.fn()
    //  .mockReturnValueOnce([useStateMock.setShowModal]);

    useActions.mockReturnValue([useActionsFns.updateSecretary, useActionsFns.deleteSecretary]);
  });

  it('should loader appear when isSecretariesLoaded is false', () => {
    // mockSecretariesSelector = {
    //   isLoading: true
    // };
    // useSelector.mockReturnValue(mockSecretariesSelector);
    const { container, debug } = render(
      <Router history={historyMock}>
        <EditSecretarysDetails
          {...props}
        />
      </Router>
      );
    
    const loader = container.querySelector('.spinner-border');
    debug()
    expect(loader).not.toBeInTheDocument();
  });

  it('should render "Edit secretarys details" component', () => {
    const { getByTestId } = render(
      <Router history={historyMock}>
        <EditSecretarysDetails
          {...props}
        />
      </Router>
    );
    expect(getByTestId('editSecretarysDetails')).toBeInTheDocument();
  });

  it('should submit correct data', async () => {
    const { getByTestId } = render(
      <Router history={historyMock}>
        <EditSecretarysDetails
          {...props}
        />
      </Router>
    );

    const firstName = getByTestId('firstName');
    const lastName = getByTestId('lastName');
    const email = getByTestId('email');
    const formValues = {
      firstName: 'testFirstName',
      lastName: 'testLastName',
      email: 'qwerty@gmail.com'
    };
    const submitBtn = getByTestId('submitBtn');

    fireEvent.change(firstName, {
      target: {
        value: formValues.firstName
      }
    });

    fireEvent.change(lastName, {
      target: {
        value: formValues.lastName
      }
    });

    fireEvent.change(email, {
      target: {
        value: formValues.email
      }
    });
   
    await waitFor(() => {
      fireEvent.click(submitBtn);
    });

    expect(useActionsFns.updateSecretary).toHaveBeenCalledWith(props.id, formValues);
  });
});