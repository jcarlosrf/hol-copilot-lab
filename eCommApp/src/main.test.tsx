import { beforeEach, describe, expect, it, vi } from 'vitest';

const { createRootMock, renderMock } = vi.hoisted(() => ({
    createRootMock: vi.fn(),
    renderMock: vi.fn()
}));

vi.mock('react-dom/client', () => ({
    default: { createRoot: createRootMock }
}));

vi.mock('./App.tsx', () => ({ default: () => null }));

describe('application entry point', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="root"></div>';
        createRootMock.mockReturnValue({ render: renderMock });
    });

    it('mounts the app into the root element', async () => {
        const rootElement = document.getElementById('root');

        await import('./main');

        expect(createRootMock).toHaveBeenCalledWith(rootElement);
        expect(renderMock).toHaveBeenCalledOnce();
    });
});