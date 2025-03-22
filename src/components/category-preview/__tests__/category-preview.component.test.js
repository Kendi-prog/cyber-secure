import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test/test.utils";
import CategoryPreview from "../category-preview.component";

describe('category-preview tests', () => {
    const mockTitle = 'hats';
    const mockProducts = [
        { id: 1, name: 'product 1', imageUrl: 'test1', price: 10 },
        { id: 2, name: 'product 2', imageUrl: 'test2', price: 20 },
        { id: 3, name: 'product 3', imageUrl: 'test3', price: 30 },
        { id: 4, name: 'product 4', imageUrl: 'test4', price: 40 },
        { id: 5, name: 'product 5', imageUrl: 'test5', price: 50 }
    ];

    test('renders category title correctly', () => {
        renderWithProviders(
            <CategoryPreview title={mockTitle} products={mockProducts} />
        );

        const titleElement = screen.getByText(mockTitle.toUpperCase());
        expect(titleElement).toBeInTheDocument();
    });

    test('renders up to 4 products', () => {
        renderWithProviders(
            <CategoryPreview title='title' products={mockProducts} />
        );

          const productNames = mockProducts.slice(0, 4).map(product => product.name);
          productNames.forEach(name => {
              expect(screen.getByText(name)).toBeInTheDocument();
          });
  
          
          const productElements = screen.getAllByText(/product/i);
          expect(productElements.length).toEqual(4);
    });
});