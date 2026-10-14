import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewModal from './ReviewModal';
import { Product } from '../types';

const product: Product = {
    id: '1',
    name: 'Apple',
    price: 0.5,
    reviews: [],
    inStock: true
};

describe('ReviewModal', () => {
    it('renders nothing when no product is selected', () => {
        const { container } = render(
            <ReviewModal product={null} onClose={vi.fn()} onSubmit={vi.fn()} />
        );

        expect(container).toBeEmptyDOMElement();
    });

    it('submits a review and resets the form', async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn();
        render(<ReviewModal product={product} onClose={vi.fn()} onSubmit={onSubmit} />);

        expect(screen.getByText('No reviews yet.')).toBeInTheDocument();
        await user.type(screen.getByPlaceholderText('Your name'), 'Ada');
        await user.type(screen.getByPlaceholderText('Your review'), 'Crisp and fresh');
        await user.click(screen.getByRole('button', { name: 'Submit' }));

        expect(onSubmit).toHaveBeenCalledWith({
            author: 'Ada',
            comment: 'Crisp and fresh',
            date: expect.any(String)
        });
        expect(screen.getByPlaceholderText('Your name')).toHaveValue('');
        expect(screen.getByPlaceholderText('Your review')).toHaveValue('');
    });

    it('renders existing reviews and closes only on an explicit close or backdrop click', async () => {
        const user = userEvent.setup();
        const onClose = vi.fn();
        const reviewedProduct = {
            ...product,
            reviews: [{ author: 'Sam', comment: 'Very fresh', date: '2026-01-02T00:00:00.000Z' }]
        };
        const { container } = render(
            <ReviewModal product={reviewedProduct} onClose={onClose} onSubmit={vi.fn()} />
        );

        expect(screen.getByText('Sam')).toBeInTheDocument();
        expect(screen.getByText('Very fresh')).toBeInTheDocument();

        await user.click(screen.getByRole('heading', { name: 'Reviews for Apple' }));
        expect(onClose).not.toHaveBeenCalled();

        await user.click(screen.getByRole('button', { name: 'Close' }));
        expect(onClose).toHaveBeenCalledOnce();

        fireEvent.click(container.querySelector('.modal-backdrop')!);
        expect(onClose).toHaveBeenCalledTimes(2);
    });
});