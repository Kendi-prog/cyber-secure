import { render, screen } from "@testing-library/react";
import Button, {BUTTON_TYPE_CLASSES} from "../button.component";

describe('button tests', () => {
    test('should render the base button when nothing is passed', () => {
        render(<Button />);

        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toHaveStyle('background-color : white');
    });

    test('should render the google button when passed the google button type', () => {
        render(<Button buttonType={BUTTON_TYPE_CLASSES.google}/>);

        const googleButtonElement = screen.getByRole('button');
        expect(googleButtonElement).toHaveStyle('background-color: rgb(53, 122, 232)');
    });

    test('should render the inverted button when passed the inverted button type', () => {
        render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted}/>);

        const invertedButtonElement = screen.getByRole('button');
        expect(invertedButtonElement).toHaveStyle('background-color: black');
    });

    test('should be disabled when isLoading is true', () => {
        render(<Button isLoading={true}/>);

        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeDisabled();
    });
});