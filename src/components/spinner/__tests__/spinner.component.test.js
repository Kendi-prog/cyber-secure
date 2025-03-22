import { render, screen } from "@testing-library/react";
import Spinner from "../spinner.component";

describe('spinner tests', () => {
    test('renders spinner', () => {
        render(<Spinner />);
        
        const spinnerElement = screen.getByRole('spinner');
        expect(spinnerElement).toBeInTheDocument();
    });
});