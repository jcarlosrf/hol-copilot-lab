import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckoutModal from './CheckoutModal';

describe('CheckoutModal', () => {
    it('renders the confirmation prompt and invokes the selected action', async () => {
        const user = userEvent.setup();
        const onConfirm = vi.fn();
        const onCancel = vi.fn();
        render(<CheckoutModal onConfirm={onConfirm} onCancel={onCancel} />);

        expect(screen.getByRole('heading', { name: 'Are you sure?' })).toBeInTheDocument();
        expect(screen.getByText('Do you want to proceed with the checkout?')).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: 'Continue Checkout' }));
        await user.click(screen.getByRole('button', { name: 'Return to cart' }));

        expect(onConfirm).toHaveBeenCalledOnce();
        expect(onCancel).toHaveBeenCalledOnce();
    });
});