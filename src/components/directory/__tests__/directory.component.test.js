import { render, screen } from "@testing-library/react";
import Directory from "../directory.component";

describe('directory tests', () => {
    test('renders the Directory component correctly', () => {
        render(<Directory />);

        const categoryElements = screen.getAllByRole('heading', { level: 2 });
        
      
        expect(categoryElements.length).toBe(5); 

       
        expect(screen.getByText(/hats/i)).toBeInTheDocument();
        expect(screen.getByText(/jackets/i)).toBeInTheDocument();
        expect(screen.getByText(/sneakers/i)).toBeInTheDocument();
        expect(screen.getByText(/womens/i)).toBeInTheDocument();
        expect(screen.getByText(/mens/i)).toBeInTheDocument();
    });
});