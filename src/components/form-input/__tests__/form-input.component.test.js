import { render, screen } from "@testing-library/react";
import FormInput from "../form-input.component";

describe('form-input tests', () => {
    test('renders input and label correctly', () => {
        render(<FormInput label='test' />);

        const labelElement = screen.getByText(/test/i);
        expect(labelElement).toBeInTheDocument();

        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeInTheDocument();
    });

    test('label is shrunk when input is filled', () => {
        render(<FormInput label='test' value='test' />);

        const labelElement = screen.getByText(/test/i);
        expect(labelElement).toHaveAttribute('shrink', 'true');
    });

    test('label is not shrunk when input is empty', () => {
        render(<FormInput label='test' value='' />);

        const labelElement = screen.getByText(/test/i);
        expect(labelElement).not.toHaveAttribute('shrink', 'false');
    });
});