import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';

describe('HomePage', () => {
    it('renders the welcome message, product prompt, navigation, and footer', () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );

        expect(screen.getByRole('heading', { name: 'Welcome to the The Daily Harvest!' })).toBeInTheDocument();
        expect(screen.getByText('Check out our products page for some great deals.')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Products' })).toHaveAttribute('href', '/products');
        expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
    });
});