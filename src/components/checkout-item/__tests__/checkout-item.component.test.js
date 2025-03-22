import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CheckoutItem from "../checkout-item.component";
import { clearItemFromCart } from "../../../store/cart/cart.action";

const mockStore = configureStore([]);
const store = mockStore({
    cart: {
        cartItems: []
    }
});

describe('checkout-item tests', () => {
    test('render item details correctly', () => {
        const mockItem = {
            imageUrl: 'test',
            price: 10,
            name: 'item 1',
            quantity: 1
        };

        render(
            <Provider store={store}>
                <CheckoutItem cartItem={mockItem} />
            </Provider>
        );
        const checkoutItemElement = screen.getByText(/item 1/i);
        expect(checkoutItemElement).toBeInTheDocument();
    });

    test('dispatches clearItemFromCart when remove button is clicked', () => {
        const mockItem = {
            imageUrl: 'test',
            price: 10,
            name: 'item 1',
            quantity: 1
        };

        render(
            <Provider store={store}>
                <CheckoutItem cartItem={mockItem} />
            </Provider>
        );

        const removeButton = screen.getByRole('button', { name: /&#10005/i });
        fireEvent.click(removeButton);

        const actions = store.getActions();
        expect(actions).toContainEqual(clearItemFromCart(mockItem));
    });

    test('dispatches addItem when right arrow is clicked', () => {
        const mockItem = {
            imageUrl: 'test',
            price: 10,
            name: 'item 1',
            quantity: 1
        };

        render(
            <Provider store={store}>
                <CheckoutItem cartItem={mockItem} />
            </Provider>
        );

        const rightArrow = screen.getByText('&#10095');
        fireEvent.click(rightArrow);

        const actions = store.getActions();
        expect(actions).toContainEqual(addItem(mockItem));
    });

    test('dispatches removeItem when left arrow is clicked', () => {
        const mockItem = {
            imageUrl: 'test',
            price: 10,
            name: 'item 1',
            quantity: 1
        };

        render(
            <Provider store={store}>
                <CheckoutItem cartItem={mockItem} />
            </Provider>
        );

        const leftArrow = screen.getByText('<');
        fireEvent.click(leftArrow);

        const actions = store.getActions();
        expect(actions).toContainEqual(removeItem(mockItem));
    });

});