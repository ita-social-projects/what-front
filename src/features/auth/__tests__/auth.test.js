import React from 'react';
import { useSelector } from 'react-redux';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useActions } from '@/shared/hooks';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth } from '../';

jest.mock('react-redux', () => ({ useSelector: jest.fn() }));

jest.mock('@/shared/hooks', () => ({
    useActions: jest.fn(),
}));


describe('App', () => {
    let mockedState;
    beforeEach(() => {
        mockedState = {
            isLoading: false,
            error: '',
            loaded: true,
            currentUser: undefined,
        };
        useSelector.mockReturnValue(mockedState);
    });

    it('should render auth component', () => {
        const { container } = render(<Router><Auth /></Router>);
        const authWrapper = container.querySelector('.container');
        const authCard = container.querySelector('.card');

        expect(authWrapper).toBeInTheDocument();
        expect(authCard).toBeInTheDocument();
    });

    it('should submit form correctly', async () => {
        const formValues = {
            email: 'testemail@gmail.com',
            password: 'testpassword123'
        };
        const submitHandler = jest.fn();
        useActions.mockReturnValue(submitHandler);

        const { container } = render(<Router><Auth /></Router>);

        const email = container.querySelector('#email');
        const password = container.querySelector('#password');
        const submitButton = container.querySelector('button[type="submit"]');

        fireEvent.change(email, {
            target: {
                value: formValues.email,
            },
        });
        fireEvent.change(password, {
            target: {
                value: formValues.password,
            },
        });

        await waitFor(() => {
            fireEvent.click(submitButton);
        });

        expect(submitHandler).toHaveBeenCalledWith(formValues);
    })
});