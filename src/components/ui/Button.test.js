import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders Button component', () => {
    render(<Button label="Click Me" />);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
});

test('Button click event', () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" onClick={handleClick} />);
    const buttonElement = screen.getByText(/Click Me/i);
    buttonElement.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
});