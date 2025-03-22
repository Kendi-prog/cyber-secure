import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SignUpForm from './sign-up-form';
import { signUpStart } from '../../store/user/user.action';

const mockStore = configureStore([]);

jest.mock('../../store/user/user.action', () => ({
    signUpStart: jest.fn(),
}));

describe('SignUpForm Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
        store.dispatch = jest.fn(); // Mock the dispatch function
    });

    test('renders SignUpForm correctly', () => {
        render(
            <Provider store={store}>
                <SignUpForm />
            </Provider>
        );

        // Check that all form fields and buttons are rendered
        expect(screen.getByLabelText(/display name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    });

    test('submits form with valid data', async () => {
        render(
            <Provider store={store}>
                <SignUpForm />
            </Provider>
        );

        // Fill in the form fields
        fireEvent.change(screen.getByLabelText(/display name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

        // Check if signUpStart action was dispatched with correct parameters
        expect(store.dispatch).toHaveBeenCalledWith(signUpStart('john@example.com', 'password123', 'John Doe'));
    });

    test('shows alert if passwords do not match', () => {
        const originalAlert = window.alert;
        window.alert = jest.fn(); // Mock alert

        render(
            <Provider store={store}>
                <SignUpForm />
            </Provider>
        );

        // Fill in the form fields with mismatched passwords
        fireEvent.change(screen.getByLabelText(/display name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password456' } });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

        // Check if alert was called
        expect(window.alert).toHaveBeenCalledWith('Passwords do not match');

        // Restore original alert
        window.alert = originalAlert;
    });

    test('shows alert for email already in use', async () => {
        const originalAlert = window.alert;
        window.alert = jest.fn(); // Mock alert

        render(
            <Provider store={store}>
                <SignUpForm />
            </Provider>
        );

        // Fill in the form fields
        fireEvent.change(screen.getByLabelText(/display name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });

        // Simulate the error response
        store.dispatch = jest.fn().mockImplementation(() => {
            throw { code: 'auth/email-already-in-use' };
        });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

        // Check if alert was called
        expect(window.alert).toHaveBeenCalledWith('Cannot create user, email already in use');

        // Restore original alert
        window.alert = originalAlert;
    });
});