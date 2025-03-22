import { render, screen, fireEvent } from "@testing-library/react";
import DirectoryItem from "../directory-item.component";

describe('directory-item tests', () => {
    test('renders directory item', () => {
        const mockItem = {
            title: 'hats',
            imageUrl: 'test',
            size: 'large',
            linkUrl: 'hats'
        };

        render(<DirectoryItem item={mockItem} />);
        const directoryItemElement = screen.getByRole('directory-item');
        expect(directoryItemElement).toBeInTheDocument();
    });

    test('navigates to the right category when clicked', () => {
        const mockItem = {
            title: 'hats',
            imageUrl: 'test',
            size: 'large',
            linkUrl: 'hats'
        };

        const navigate = jest.fn();
        render(<DirectoryItem item={mockItem} navigate={navigate} />);
        
        const directoryItemElement = screen.getByRole('directory-item');
        fireEvent.click(directoryItemElement);
        expect(navigate).toHaveBeenCalled();
    });

});