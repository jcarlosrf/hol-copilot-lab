import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ProductsPage from './ProductsPage';
import { CartContext, CartItem } from '../context/CartContext';
import { Product } from '../types';

const products: Product[] = [
    {
        id: '1',
        name: 'Apple',
        description: 'A juicy red apple',
        price: 0.5,
        image: 'apple.png',
        reviews: [],
        inStock: true
    },
    {
        id: '2',
        name: 'Grapes',
        description: 'Sweet grapes',
        price: 2.5,
        image: 'grapes.png',
        reviews: [],
        inStock: true
    },
    {
        id: '3',
        name: 'Orange',
        description: 'A tangy orange',
        price: 0.75,
        image: 'orange.png',
        reviews: [],
        inStock: false
    },
    {
        name: 'Pear',
        price: 0.6,
        reviews: [],
        inStock: true
    }
];

const cartContext = {
    cartItems: [] as CartItem[],
    addToCart: vi.fn(),
    clearCart: vi.fn()
};

const responseFor = (product: Product) => ({
    ok: true,
    json: async () => product
});

const stubSuccessfulFetch = () => {
    const fetchMock = vi.fn();
    products.forEach(product => fetchMock.mockResolvedValueOnce(responseFor(product)));
    vi.stubGlobal('fetch', fetchMock);
    return fetchMock;
};

const renderProductsPage = () => render(
    <MemoryRouter>
        <CartContext.Provider value={cartContext}>
            <ProductsPage />
        </CartContext.Provider>
    </MemoryRouter>
);

describe('ProductsPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    it('loads products and lets the user add an in-stock product to the cart', async () => {
        const user = userEvent.setup();
        const fetchMock = stubSuccessfulFetch();
        renderProductsPage();

        expect(await screen.findByRole('heading', { name: 'Our Products' })).toBeInTheDocument();
        expect(fetchMock).toHaveBeenCalledTimes(4);
        expect(screen.getByText('Pear')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Out of Stock' })).toBeDisabled();

        await user.click(screen.getAllByRole('button', { name: 'Add to Cart' })[0]);
        expect(cartContext.addToCart).toHaveBeenCalledWith(products[0]);
    });

    it('submits a review for the selected product', async () => {
        const user = userEvent.setup();
        stubSuccessfulFetch();
        renderProductsPage();

        await user.click(await screen.findByRole('img', { name: 'Apple' }));
        expect(screen.getByText('No reviews yet.')).toBeInTheDocument();
        await user.type(screen.getByPlaceholderText('Your name'), 'Ada');
        await user.type(screen.getByPlaceholderText('Your review'), 'Crisp and fresh');
        await user.click(screen.getByRole('button', { name: 'Submit' }));

        expect(screen.getByText('Crisp and fresh')).toBeInTheDocument();
        expect(screen.getByText(/Ada/)).toBeInTheDocument();
    });

    it('stops loading and logs an error when a product request fails', async () => {
        const fetchMock = vi.fn()
            .mockResolvedValueOnce({ ok: false, json: async () => null })
            .mockResolvedValueOnce(responseFor(products[1]))
            .mockResolvedValueOnce(responseFor(products[2]))
            .mockResolvedValueOnce(responseFor(products[3]));
        vi.stubGlobal('fetch', fetchMock);
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

        renderProductsPage();

        expect(await screen.findByRole('heading', { name: 'Our Products' })).toBeInTheDocument();
        expect(screen.queryByText('Loading products...')).not.toBeInTheDocument();
        expect(consoleError).toHaveBeenCalledWith(
            'Error loading products:',
            expect.any(Error)
        );
    });
});