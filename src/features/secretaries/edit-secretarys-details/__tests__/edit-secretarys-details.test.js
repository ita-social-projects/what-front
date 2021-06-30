import React from 'react';
import { Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import { EditSecretarysDetails } from '../';
import { secretarysMock } from './mock/mock-data.js';


jest.mock('react-redux', () => ({
  useSelector: jest.fn()
}));

jest.mock('@/shared/hooks', () => ({
  useActions: jest.fn()
}));



describe('EditSecretarysDetails', () => {
    let mockSecretariesSelector;
    // let mockUpdatedSecretarySelector;
    // let mockDeletedSecretarySelector;
    let historyMock;
    
    const props = {
        id: 1
    };
  beforeEach(() => {
    mockSecretariesSelector = {
        data: secretarysMock,
        isLoading: false,
        isLoaded: true,
        error: '',
    };
    // mockUpdatedSecretarySelector = {
    //     isLoaded: false,
    //     isLoading: false,
    //     error: ''
    // };
    // mockDeletedSecretarySelector = {
    //     isLoaded: false,
    //     isLoading: false,
    //     error: ''
    // };
    
    useSelector
        .mockReturnValueOnce(mockSecretariesSelector)
        // .mockReturnValueOnce(mockUpdatedSecretarySelector)
        // .mockReturnValueOnce(mockDeletedSecretarySelector)
    historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
  });

  it('should render edit secretarys details', () => {
    const { getByTestId } = render(<Router history={historyMock}>
            <EditSecretarysDetails { ...props } />
        </Router>);
    expect(getByTestId('editSecretarysDetails')).toBeInTheDocument();
  });
});