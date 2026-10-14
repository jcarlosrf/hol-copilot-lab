import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ContactUs from './ContactUs';

describe('ContactUs', () => {
    it('opens the contact form and shows confirmation after clearing the submitted entries', () => {
        render(<ContactUs />);

        fireEvent.click(screen.getByRole('button', { name: 'Contact Us' }));

        const nameInput = screen.getByRole('textbox', { name: 'Name' });
        const emailInput = screen.getByRole('textbox', { name: 'Email' });
        const requestInput = screen.getByRole('textbox', { name: 'Request' });

        fireEvent.change(nameInput, { target: { value: 'Taylor' } });
        fireEvent.change(emailInput, { target: { value: 'taylor@example.com' } });
        fireEvent.change(requestInput, { target: { value: 'I need help with an order.' } });
        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

        expect(screen.getByRole('heading', { name: 'Thank you for your message.' })).toBeInTheDocument();
        expect(screen.queryByRole('textbox', { name: 'Name' })).not.toBeInTheDocument();
        expect(screen.queryByRole('textbox', { name: 'Email' })).not.toBeInTheDocument();
        expect(screen.queryByRole('textbox', { name: 'Request' })).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'Contact Us' }));
        expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue('');
        expect(screen.getByRole('textbox', { name: 'Email' })).toHaveValue('');
        expect(screen.getByRole('textbox', { name: 'Request' })).toHaveValue('');
    });
});
