import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test/test.utils";
import Category from "../category.component";
import { useParams } from "react-router-dom";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        category: 'mens'
    }),
    
}));

describe('Category tests', () => {
    test('It should render the spinner when isLoading is true', () => {
        renderWithProviders(<Category />, {
            preloadedState: {
                categories: {
                    isLoading: true,
                    categories: []
                }
            }
        });

        const spinnerElement = screen.getByTestId('spinner');
        expect(spinnerElement).toBeInTheDocument();
    });

    test('It should not render the products when isLoading is false and items are present', () => {
        renderWithProviders(<Category />, {
            preloadedState: {
                categories: {
                    isLoading: false,
                    categories: [
                        {
                            title: 'mens',
                            items: [
                                { id: 1, name: 'product 1' },
                                { id:2, name: 'product 2'}
                            ]
                        }
                    ]
                }
            }
        });

        const spinnerElement = screen.queryByTestId('spinner');
        expect(spinnerElement).toBeNull();

        const product1Element = screen.getByText(/product 1/i);
        expect(product1Element).toBeInTheDocument();
    })
});