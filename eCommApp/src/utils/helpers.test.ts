import { describe, expect, it } from 'vitest';
import { calculateTotal, formatPrice, validateEmail } from './helpers';

describe('formatPrice', () => {
    it('formats a number as US dollars', () => {
        expect(formatPrice(12.5)).toBe('$12.50');
    });
});

describe('calculateTotal', () => {
    it('adds each item price multiplied by its quantity', () => {
        expect(calculateTotal([
            { price: 12.5, quantity: 2 },
            { price: 3, quantity: 1 }
        ])).toBe(28);
    });

    it('returns zero when the cart is empty', () => {
        expect(calculateTotal([])).toBe(0);
    });
});

describe('validateEmail', () => {
    it('accepts a valid email address', () => {
        expect(validateEmail('developer@example.com')).toBe(true);
    });

    it.each(['', 'not-an-email', 'missing-domain@', '@missing-user.com', 'two@@example.com'])(
        'rejects an invalid email address: %s',
        email => {
            expect(validateEmail(email)).toBe(false);
        }
    );
});