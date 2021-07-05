import React from 'react';
import { Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { paths, useActions } from '@/shared';
import { fireEvent, getByTestId, render, waitFor } from '@testing-library/react';
import { EditSecretarysDetails } from '../';
import { SecretarysMock } from './__mock__/mock-data.js';

jest.mock('react-redux', () => ({
  useSelector: jest.fn()
}));

jest.mock('@/shared/hooks', () => ({
  useActions: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  // useParams: jest.fn().mockReturnValue({ id: 1 }),
}));

const props = {
  id: 1
};

describe('Edit Secretarys Details', () => {
  let mockSecretariesSelector;
  let mockUpdatedSecretarySelector;
  let mockDeletedSecretarySelector;
  let useActionsFns;
  let mockUseState;
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
      deleteSecretary: jest.fn(),
      dispatchAddAlert: jest.fn()
    };

    mockUseState = {
      toShowModal: false,
      setShowModal: jest.fn()
    };

    historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    
    useSelector
      .mockReturnValueOnce(mockSecretariesSelector)
      .mockReturnValue(mockUpdatedSecretarySelector)
      .mockReturnValue(mockDeletedSecretarySelector)

    useActions.mockReturnValue([useActionsFns.updateSecretary, useActionsFns.dispatchAddAlert, useActionsFns.deleteSecretary]);

    React.useState = jest.fn()
      .mockReturnValue([mockUseState.toShowModal, mockUseState.setShowModal]);
  });

  // it('should redirect to URL NOT_FOUND if secretaryError ', () => {
  //   // mockSecretariesSelector = {
  //   //   data: [],
  //   //   isLoaded: true
  //   // };
  //   // useSelector.mockReturnValue(mockSecretariesSelector);

  //   render(
  //     <Router history={historyMock}>
  //       <EditSecretarysDetails
  //         {...props}
  //       />
  //     </Router>);
  //   expect(historyMock.push.mock.calls[0][0]).toEqual(paths.NOT_FOUND);
  // });

  // it('should loader appear when isSecretariesLoaded is false', () => {
  //   // const mockLocal = { isLoading: true, isLoaded: false };
  //   // mockSecretariesSelector = {
  //   //   isLoading: mockLocal,
  //   // };
  //   // useSelector.mockReturnValue(mockSecretariesSelector);
  //   const { container, debug } = render(
  //     <Router history={historyMock}>
  //       <EditSecretarysDetails
  //         {...props}
  //       />
  //     </Router>
  //     );
  //   debug()
  //   const loader = container.querySelector('.spinner-border');
  //   expect(loader).toBeInTheDocument();
  // });

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

  it('should redirect to path "/secretaries" when !secretaryUpdateError && isUpdateLoaded', () => {
    mockUpdatedSecretarySelector = {
      isLoaded: true,
      isLoading: false,
      error: ''
    };
    useSelector
      .mockReturnValueOnce(mockUpdatedSecretarySelector);
    render(<Router history={historyMock}><EditSecretarysDetails {...props} /></Router>);
    expect(historyMock.push.mock.calls[0][0]).toEqual(paths.SECRETARIES);
    expect(useActionsFns.dispatchAddAlert).toHaveBeenCalledWith('The secretary has been successfully edited', 'success');
  });

  // it('should redirect to path "/secretaries" when secretaryUpdateError && !isUpdateLoaded', () => {
  //   mockUpdatedSecretarySelector = {
  //     isLoaded: false,
  //     isLoading: true,
  //     error: ''
  //   };
  //   // useSelector
  //   //   .mockReturnValueOnce(mockUpdatedSecretarySelector);
  //   render(<Router history={historyMock}><EditSecretarysDetails {...props} /></Router>);
  //   expect(useActionsFns.dispatchAddAlert).toHaveBeenCalledWith(mockUpdatedSecretarySelector.error);
  // });

  it('should change state variable, when the button "Lay off" is clicked', async () => {
    const { getByTestId } = render(
      <Router history={historyMock}>
        <EditSecretarysDetails
          {...props}
        />
      </Router>
    );

    const handleShowModal = jest.fn();

    const openModalBtn = getByTestId('openModalBtn');

    await waitFor(() => {
      fireEvent.click(openModalBtn);
      handleShowModal();
    });

    expect(handleShowModal).toHaveBeenCalled();
    expect(mockUseState.setShowModal).toHaveBeenCalledWith(true);
  });

  // it('should open modal window and delete secretarys', async () => {
  //   // React.useState = jest.fn().mockReturnValue([true, mockUseState.setShowModal]);
  //   const { debug } = render(
  //     <Router history={historyMock}>
  //       <EditSecretarysDetails
  //         {...props}
  //       />
  //     </Router>
  //   );
  //   const handleDelete = jest.fn();
  //   // const del = getByTestId('deleteBtn');
 
  //   // await waitFor(() => {
  //   //   fireEvent.click(del);
  //   //   handleDelete();
  //   // });
    
  //   // expect(useActionsFns.deleteSecretary).toHaveBeenCalledWith(props.id);

  //   debug()
  // });

  it('should redirect to path "/secretaries" when !secretaryDeleteError && isDeleteLoaded', () => {
    mockDeletedSecretarySelector = {
      isLoaded: true,
      isLoading: false,
      error: ''
    };
    useSelector
      .mockReturnValueOnce(mockDeletedSecretarySelector);
    render(<Router history={historyMock}><EditSecretarysDetails {...props} /></Router>);
    expect(historyMock.push.mock.calls[0][0]).toEqual(paths.SECRETARIES);
  });
});