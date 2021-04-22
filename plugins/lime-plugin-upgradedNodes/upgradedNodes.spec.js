// Here you define tests that closely resemble how your component is used
// Using the testing-library: https://testing-library.com

import { h } from 'preact';
import { fireEvent, screen, cleanup, act } from '@testing-library/preact';
import '@testing-library/jest-dom';
import { render } from 'utils/test_utils';
import queryCache from 'utils/queryCache';

import UpgradedNodesPage from './src/upgradedNodesPage';
import { getNodes } from 'plugins/lime-plugin-network-nodes/src/networkNodesApi';
import { getNewVersion } from 'plugins/lime-plugin-firmware/src/firmwareApi';

jest.mock('plugins/lime-plugin-network-nodes/src/networkNodesApi');
jest.mock('plugins/lime-plugin-firmware/src/firmwareApi');


describe('upgradedNodes', () => {
    beforeEach(() => {
        getNodes.mockImplementation(async () => [
            { hostname: 'node1', status: 'unreachable', fw_version: 'LibreRouterOS 1.4' },
            { hostname: 'node2', status: 'recently_reachable', fw_version: 'LibreRouterOS 1.4' },
            { hostname: 'node3', status: 'unreachable', fw_version: 'LibreRouterOS 1.3' },
            { hostname: 'node4', status: 'recently_reachable', fw_version: 'LibreRouterOS 1.3' },
        ]);
        getNewVersion.mockImplementation(async () => ({
            version: 'LibreRouterOS 1.4'
        }))
    });

    afterEach(() => {
        cleanup();
        act(() => queryCache.clear());
    });

    it('shows one tab for upgraded nodes and one for not upgradaded nodes with length', async () => {
        render(<UpgradedNodesPage />);
        expect(await screen.findByRole('tab', { name: /^Upgraded \(2\)/i })).toBeVisible();
        expect(await screen.findByRole('tab', { name: /^Not Upgraded \(2\)/i })).toBeVisible();
    })

    it('shows one row with the hostname for each upgraded node', async () => {
        render(<UpgradedNodesPage />);
        expect(await screen.findByText('node1')).toBeVisible();
        expect(await screen.findByText('node2')).toBeVisible();
    })

    it('shows one row with the hostname for each not upgraded node', async () => {
        render(<UpgradedNodesPage />);
        const tabNotUpgraded = await screen.findByRole('tab', { name: /^Not Upgraded \(2\)/i });
        fireEvent.click(tabNotUpgraded);
        expect(await screen.findByText('node3')).toBeVisible();
        expect(await screen.findByText('node4')).toBeVisible();
    })
});
