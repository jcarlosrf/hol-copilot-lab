import { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { CartContext, CartProvider } from './CartContext';
import { Product } from '../types';

const product: Product = {
    id: 'apple',
    name: 'Apple',
    price: 0.5,
    reviews: [],
    inStock: true
};

const CartProbe = () => {
    const cart = useContext(CartContext);

    if (!cart) return null;

    return (
        <>
            <ul>
                {cart.cartItems.map(item => (
                    <li key={item.id}>{item.name}: {item.quantity}</li>
                ))}
            </ul>
            <button onClick={() => cart.addToCart(product)}>Add apple</button>
            <button onClick={cart.clearCart}>Clear cart</button>
        </>
    );
};

const renderCart = () => render(
    <CartProvider>
        <CartProbe />
    </CartProvider>
);

describe('CartProvider', () => {
    it('starts with an empty cart', () => {
        renderCart();

        expect(screen.queryByText('Apple: 1')).not.toBeInTheDocument();
    });

    it('adds a new product and increments its quantity when added again', async () => {
        const user = userEvent.setup();
        renderCart();

        await user.click(screen.getByRole('button', { name: 'Add apple' }));
        expect(screen.getByText('Apple: 1')).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: 'Add apple' }));
        expect(screen.getByText('Apple: 2')).toBeInTheDocument();
    });

    it('clears all items from the cart', async () => {
        const user = userEvent.setup();
        renderCart();

        await user.click(screen.getByRole('button', { name: 'Add apple' }));
        await user.click(screen.getByRole('button', { name: 'Clear cart' }));

        expect(screen.queryByText('Apple: 1')).not.toBeInTheDocument();
    });
});