import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SignInForm from './sign-in-form';
import { googleSignInStart, emailSignInStart } from '../../store/user/user.action';

const mockStore = configureStore([]);

jest.mock('../../store/user/user.action', () => ({
    googleSignInStart: jest.fn(),
    emailSignInStart: jest.fn(),
}));

describe('SignInForm Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
        store.dispatch = jest.fn(); // Mock the dispatch function
    });

    test('renders SignInForm correctly', () => {
        render(
            <Provider store={store}>
                <SignInForm />
            </Provider>
        );

        // Check that all form fields and buttons are rendered
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /google sign in/i })).toBeInTheDocument();
    });

    test('submits form with valid data', async () => {
        render(
            <Provider store={store}>
                <SignInForm />
            </Provider>
        );

        // Fill in the form fields
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        // Check if emailSignInStart action was dispatched with correct parameters
        expect(store.dispatch).toHaveBeenCalledWith(emailSignInStart('john@example.com', 'password123'));
    });

    test('shows alert for invalid credentials', () => {
        const originalAlert = window.alert;
        window.alert = jest.fn(); // Mock alert

        render(
            <Provider store={store}>
                <SignInForm />
            </Provider>
        );

        // Fill in the form fields with an invalid email
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

        // Simulate the error response
        store.dispatch = jest.fn().mockImplementation(() => {
            throw { code: 'auth/invalid-email' };
        });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        // Check if alert was called
        expect(window.alert).toHaveBeenCalledWith('Invalid Credential');

        // Restore original alert
        window.alert = originalAlert;
    });

    test('invokes google sign in on button click', () => {
        render(
            <Provider store={store}>
                <SignInForm />
            </Provider>
        );

        // Click the Google sign in button
        fireEvent.click(screen.getByRole('button', { name: /google sign in/i }));

        // Check if googleSignInStart action was dispatched
        expect(store.dispatch).toHaveBeenCalledWith(googleSignInStart());
    });
});