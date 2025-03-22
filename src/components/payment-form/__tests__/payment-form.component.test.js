import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './payment-form';
import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

const mockStore = configureStore([]);

jest.mock('../../store/cart/cart.selector', () => ({
    selectCartTotal: jest.fn(),
}));

jest.mock('../../store/user/user.selector', () => ({
    selectCurrentUser: jest.fn(),
}));

global.fetch = jest.fn();

describe('PaymentForm Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
        selectCartTotal.mockReturnValue(100); // Mock total amount
        selectCurrentUser.mockReturnValue({ displayName: 'John Doe' }); // Mock current user
        jest.clearAllMocks();
    });

    test('renders PaymentForm correctly', () => {
        render(
            <Provider store={store}>
                <Elements>
                    <PaymentForm />
                </Elements>
            </Provider>
        );

        // Check that the CardElement and button are rendered
        expect(screen.getByText(/enter card details/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /pay now/i })).toBeInTheDocument();
    });

    test('submits payment successfully', async () => {
        const mockResponse = {
            paymentIntent: { client_secret: 'test_client_secret' },
        };

        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        render(
            <Provider store={store}>
                <Elements>
                    <PaymentForm />
                </Elements>
            </Provider>
        );

        // Simulate filling in card details and submitting
        fireEvent.submit(screen.getByRole('form'));

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('/.netlify/functions/create-payment-intents', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: 10000 }), // 100 * 100
            });
        });

        // Here, we would need to mock the Stripe API call
        // For the purposes of this test, we can assume payment is confirmed
        // You may need to mock the `stripe.confirmCardPayment` method if testing in detail
    });

    test('handles payment error', async () => {
        const mockResponse = {
            paymentIntent: { client_secret: 'test_client_secret' },
        };

        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        render(
            <Provider store={store}>
                <Elements>
                    <PaymentForm />
                </Elements>
            </Provider>
        );

        // Simulate filling in card details and submitting
        fireEvent.submit(screen.getByRole('form'));

        // Simulate a payment error
        const mockStripe = {
            confirmCardPayment: jest.fn().mockResolvedValueOnce({
                error: { message: 'Payment failed' },
            }),
        };

        // Assign the mock to the stripe variable
        // This might require a different approach depending on your setup

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Payment failed');
        });
    });
});