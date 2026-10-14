import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AdminPage from './AdminPage';

const renderAdminPage = () => render(
    <MemoryRouter>
        <AdminPage />
    </MemoryRouter>
);

describe('AdminPage', () => {
    it('starts without a sale and can start and end a sale', async () => {
        const user = userEvent.setup();
        renderAdminPage();

        expect(screen.getByText('No sale active.')).toBeInTheDocument();
        const saleInput = screen.getByLabelText(/set sale percent/i);
        await user.clear(saleInput);
        await user.type(saleInput, '25');
        await user.click(screen.getByRole('button', { name: 'Submit' }));

        expect(screen.getByText('All products are 25% off!')).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: 'End Sale' }));
        expect(screen.getByText('No sale active.')).toBeInTheDocument();
        expect(saleInput).toHaveValue('0');
    });

    it('shows an error when the sale percentage is not a number', async () => {
        const user = userEvent.setup();
        renderAdminPage();

        await user.clear(screen.getByLabelText(/set sale percent/i));
        await user.type(screen.getByLabelText(/set sale percent/i), 'invalid');
        await user.click(screen.getByRole('button', { name: 'Submit' }));

        expect(screen.getByText(/please enter a valid number/i)).toBeInTheDocument();
        expect(screen.getByText('No sale active.')).toBeInTheDocument();
    });
});