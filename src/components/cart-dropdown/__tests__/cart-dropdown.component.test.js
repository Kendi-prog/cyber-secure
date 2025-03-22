import { screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { renderWithProviders } from "../../../utils/test/test.utils";
import CartDropdown from "../cart-dropdown.component";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));


describe('cart-dropdown tests', () => {

    const mockCartItems = [
        {
            id: 1,
            imageUrl: 'test',
            price: 10,
            name: 'item 1',
            quantity: 1
        } 
    ];

    test('renders empty message when cart is empty', () => {
        renderWithProviders(<CartDropdown />, {
            preloadedState: {
                cart: {
                    cartItems: []
                }
            }
        });

        const cartDropdownElement = screen.getByText(/your cart is empty/i);
        expect(cartDropdownElement).toBeInTheDocument();
    });

    test('renders cart items when cart is not empty', () => {
     

        renderWithProviders(<CartDropdown />, {
            preloadedState: {
                cart: {
                    cartItems: mockCartItems
                }
            }
        });

        const cartDropdownElement = screen.getByText('item 1');
        expect(cartDropdownElement).toBeInTheDocument();
    });

    test('navigates to checkout when the checkout button is clicked', () => {
        const navigate = jest.fn();
        useNavigate.mockReturnValue(navigate);

        renderWithProviders(
            <CartDropdown />,
            {
                preloadedState: {
                    cart: {
                        cartItems: mockCartItems
                    }
                }
            }
        );

        const checkoutButtonElement = screen.getByText(/go to checkout/i);
        fireEvent.click(checkoutButtonElement);

        expect(navigate).toHaveBeenCalledWith('/checkout');
    });
});