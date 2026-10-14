import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';

const renderLoginPage = () => render(
    <MemoryRouter initialEntries={['/login']}>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<h1>Admin dashboard</h1>} />
        </Routes>
    </MemoryRouter>
);

describe('LoginPage', () => {
    it('shows an error for invalid credentials', async () => {
        const user = userEvent.setup();
        renderLoginPage();

        await user.type(screen.getByPlaceholderText('Username'), 'wrong-user');
        await user.type(screen.getByPlaceholderText('Password'), 'wrong-password');
        await user.click(screen.getByRole('button', { name: 'Login' }));

        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });

    it('navigates to the admin page for valid credentials', async () => {
        const user = userEvent.setup();
        renderLoginPage();

        await user.type(screen.getByPlaceholderText('Username'), 'admin');
        await user.type(screen.getByPlaceholderText('Password'), 'admin');
        await user.click(screen.getByRole('button', { name: 'Login' }));

        expect(screen.getByRole('heading', { name: 'Admin dashboard' })).toBeInTheDocument();
    });
});