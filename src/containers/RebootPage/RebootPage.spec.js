
import { h } from 'preact';

import { screen, fireEvent } from '@testing-library/preact';
import '@testing-library/jest-dom';
import waitForExpect from 'wait-for-expect';

import { render } from 'utils/test_utils';

import { RebootPage } from './';

import { reboot } from 'utils/api';
import { route } from 'preact-router';

jest.mock('utils/api');

describe('RebootPage', () => {
    beforeEach(() => {
        reboot.mockClear();
        reboot.mockImplementation(async () => null);
    });

    it('ask if user is sure of rebooting', async () => {
        render(<RebootPage />);
        expect(await screen.findByText('Are you sure you want to reboot?')).toBeVisible();
    });

    it('reboots when yes is clicked', async () => {
        render(<RebootPage />);
        const yesButton = await screen.findByRole('button', { name: /yes/i });
        fireEvent.click(yesButton);
        await waitForExpect(() => {
            expect(reboot).toHaveBeenCalled();
        });
    });

    it('shows a please wait for reboot message when rebooting', async () => {
        render(<RebootPage />);
        expect(screen.queryByText(
            'Please wait while the device reboots, and reload the app')
        ).toBeNull();
        const yesButton = await screen.findByRole('button', { name: /yes/i });
        fireEvent.click(yesButton);
        expect(await screen.findByText(
            'Please wait while the device reboots, and reload the app')
        ).toBeVisible();
    });

    it('redirects to home when no is clicked', async () => {
        render(<RebootPage />);
        const noButton = await screen.findByRole('button', { name: /no, cancel/i });
        fireEvent.click(noButton);
        await waitForExpect(() => {
            expect(route).toHaveBeenCalledWith('/');
        });
        expect(reboot).not.toHaveBeenCalled();

    });
});
