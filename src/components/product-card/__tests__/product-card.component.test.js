import { screen, fireEvent } from "@testing-library/react";
import ProductCard from "../product-card.component";
import { renderWithProviders } from "../../../utils/test/test.utils";

describe('Product card tests', () => {
    test('It should add a product item when the product card button is clicked', async () => {
        const mockProduct = {
            id: 1,
            imageUrl: 'test',
            name: 'item A',
            price: 19
        }

        const { store} = renderWithProviders(<ProductCard product={mockProduct} />, {
            preloadedState: {
                cart: {
                    cartItems: []
                }
            }
        });

        const addToCartButton = screen.getByText(/add to cart/i);
        await fireEvent.click(addToCartButton);
        expect(store.getState().cart.cartItems.length).toBe(1);

    })
})