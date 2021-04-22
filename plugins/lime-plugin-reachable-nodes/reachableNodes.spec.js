import { h } from 'preact';
import { fireEvent, act, screen } from '@testing-library/preact';
import '@testing-library/jest-dom';

import ReachableNodesPage from './src/reachableNodesPage';
import queryCache from 'utils/queryCache';
import { getNodes, markNodesAsGone } from 'plugins/lime-plugin-network-nodes/src/networkNodesApi';
import { render } from 'utils/test_utils';

jest.mock('plugins/lime-plugin-network-nodes/src/networkNodesApi');

beforeEach(() => {
    getNodes.mockImplementation(async () => [
        { hostname: 'node1', status: 'recently_reachable' },
        { hostname: 'node2', status: 'recently_reachable' },
        { hostname: 'node3', status: 'recently_reachable' },
        { hostname: 'node4', status: 'unreachable' },
        { hostname: 'node5', status: 'unreachable' },
        { hostname: 'node6', status: 'unreachable' },
        { hostname: 'node7', status: 'unreachable' },
        { hostname: 'node8', status: 'gone' },
        { hostname: 'node9', status: 'gone' },
    ]);
    markNodesAsGone.mockImplementation(async () => []);
});

afterEach(() => {
    act(() => queryCache.clear());
});

describe('network nodes screen', () => {
    it('shows one tab for reachable nodes and one for unreachable nodes with length', async () => {
        render(<ReachableNodesPage />);
        expect(await screen.findByRole('tab', { name: /^reachable \(3\)/i })).toBeVisible();
        expect(await screen.findByRole('tab', { name: /^unreachable \(4\)/i })).toBeVisible();
    })

    it('shows one row with the hostname for each connect node', async () => {
        render(<ReachableNodesPage />);
        expect(await screen.findByText('node1')).toBeVisible();
        expect(await screen.findByText('node2')).toBeVisible();
        expect(await screen.findByText('node3')).toBeVisible();
    })

    it('shows one row with the hostname for each disconnect node', async () => {
        render(<ReachableNodesPage />);
        const tabDisconnected = await screen.findByRole('tab', { name: /^unreachable \(4\)/i });
        fireEvent.click(tabDisconnected);
        expect(await screen.findByText('node4')).toBeVisible();
        expect(await screen.findByText('node5')).toBeVisible();
        expect(await screen.findByText('node6')).toBeVisible();
        expect(await screen.findByText('node7')).toBeVisible();
    })

    it('shows help message when clicking on help button', async () => {
        render(<ReachableNodesPage />);
        const helpButton = await screen.findByLabelText('help');
        fireEvent.click(helpButton);
        expect(await screen.findByText("Reachable Nodes")).toBeVisible();
        expect(await screen.findByText("These are the nodes that can be reached from your node, " +
            "i.e. there is a working path from your node to each of them." +
            "This information is synced periodically " +
            "and can be outdated by some minutes")).toBeVisible();
        expect(await screen.findByText("Unreachable Nodes")).toBeVisible();
        expect(await screen.findByText("These are the nodes that can't be reached from your node, " +
            "it is possible that they are not turned on or a link to reach them is down.")).toBeVisible();
    })
});
