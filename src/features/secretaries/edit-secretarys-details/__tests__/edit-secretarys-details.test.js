import React from 'react';
import { Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { paths, useActions } from '@/shared';
import { render } from '@testing-library/react';
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
    
    useSelector
        .mockReturnValueOnce(mockSecretariesSelector)
        .mockReturnValueOnce(mockUpdatedSecretarySelector)
        .mockReturnValueOnce(mockDeletedSecretarySelector);

    useActionsFns = {
        updateSecretary: jest.fn(),
        deleteSecretary: jest.fn()
    };

    useActions.mockReturnValue([useActionsFns.updateSecretary, useActionsFns.deleteSecretary]);

    historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

  });

  it('should render edit secretarys details', () => {
    const { getByTestId } = render(<Router history={historyMock}><EditSecretarysDetails {...props} /></Router>)
    expect(getByTestId('editSecretarysDetails')).toBeInTheDocument();
  });
});