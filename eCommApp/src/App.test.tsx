import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App routes', () => {
    it('renders the home page for the root route', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByRole('heading', { name: 'Welcome to the The Daily Harvest!' })).toBeInTheDocument();
    });

    it('provides the cart context to the cart route', () => {
        render(
            <MemoryRouter initialEntries={['/cart']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByRole('heading', { name: 'Your Cart' })).toBeInTheDocument();
        expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
    });
});