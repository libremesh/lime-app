import { h } from 'preact';
import { fireEvent, act, screen } from '@testing-library/preact';
import '@testing-library/jest-dom';
import waitForExpect from 'wait-for-expect';

import NetworkNodesPage from './src/networkNodesPage';
import DeleteNodesPage from './src/containers/deleteNodesPage';
import queryCache from 'utils/queryCache';
import { getNodes, markNodesAsGone } from './src/networkNodesApi';
import { render } from 'utils/test_utils';

jest.mock('./src/networkNodesApi');

beforeEach(() => {
    getNodes.mockImplementation(async () => [
        { hostname: 'node1', status: 'connected' },
        { hostname: 'node2', status: 'connected' },
        { hostname: 'node3', status: 'connected' },
        { hostname: 'node4', status: 'disconnected' },
        { hostname: 'node5', status: 'disconnected' },
        { hostname: 'node6', status: 'disconnected' },
        { hostname: 'node7', status: 'disconnected' },
        { hostname: 'node8', status: 'gone' },
        { hostname: 'node9', status: 'gone' },
    ]);
    markNodesAsGone.mockImplementation(async () => []);
});

afterEach(() => {
    act(() => queryCache.clear());
});

describe('network nodes screen', () => {
    it('shows one tab for connected nodes and one for discconected nodes with length', async () => {
        render(<NetworkNodesPage />);
        expect(await screen.findByRole('tab', { name: /^connected \(3\)/i })).toBeVisible();
        expect(await screen.findByRole('tab', { name: /^disconnected \(4\)/i })).toBeVisible();
    })

    it('shows one row with the hostname for each connect node', async () => {
        render(<NetworkNodesPage />);
        expect(await screen.findByText('node1')).toBeVisible();
        expect(await screen.findByText('node2')).toBeVisible();
        expect(await screen.findByText('node3')).toBeVisible();
    })

    it('shows one row with the hostname for each disconnect node', async () => {
        render(<NetworkNodesPage />);
        const tabDisconnected = await screen.findByRole('tab', { name: /^disconnected \(4\)/i });
        fireEvent.click(tabDisconnected);
        expect(await screen.findByText('node4')).toBeVisible();
        expect(await screen.findByText('node5')).toBeVisible();
        expect(await screen.findByText('node6')).toBeVisible();
        expect(await screen.findByText('node7')).toBeVisible();
    })

    it('shows a link to go to delete nodes page', async () => {
        render(<NetworkNodesPage />);
        const tabDisconnected = await screen.findByRole('tab', { name: /^disconnected \(4\)/i });
        fireEvent.click(tabDisconnected);
        expect(await screen.findByRole('link', { name: /go to delete nodes/i })).toBeVisible();
    })

    it('does not show a link to go to delete nodes page if there are no disconnected nodes', async () => {
        getNodes.mockImplementation(async () => [
            { hostname: 'node1', status: 'connected' },
            { hostname: 'node2', status: 'connected' },
            { hostname: 'node3', status: 'connected' },
        ]);
        render(<NetworkNodesPage />);
        const tabDisconnected = await screen.findByRole('tab', { name: /^disconnected \(0\)/i });
        fireEvent.click(tabDisconnected);
        expect(screen.queryByRole('link', { name: /go to delete nodes/i })).toBeNull();
    })

    it('shows help message when clicking on help button', async () => {
        render(<NetworkNodesPage />);
        const helpButton = await screen.findByLabelText('help');
        fireEvent.click(helpButton);
        expect(await screen.findByText("Connected Nodes")).toBeVisible();
        expect(await screen.findByText("These are the nodes with which you have connectivity, "
            + "i.e. there is a working path from your node to each of them.")).toBeVisible();
        expect(await screen.findByText("Disconnected Nodes")).toBeVisible();
        expect(await screen.findByText("These are the nodes with which you do not have connectivity, "
            + "it is possible that they are not turned on or a link to reach them is down.")).toBeVisible();
    })
});


describe('delete nodes page', () => {
    it('shows the list of disconnected nodes only', async () => {
        render(<DeleteNodesPage />);
        expect(await screen.findByText('node4')).toBeVisible();
        expect(await screen.findByText('node5')).toBeVisible();
        expect(await screen.findByText('node6')).toBeVisible();
        expect(await screen.findByText('node7')).toBeVisible();
        expect(screen.queryByText('node1')).toBeNull();
        expect(screen.queryByText('node2')).toBeNull();
        expect(screen.queryByText('node3')).toBeNull();
        expect(screen.queryByText('node8')).toBeNull();
        expect(screen.queryByText('node9')).toBeNull();
    })

    it('calls the markNodesAsGone api when deleting', async () => {
        markNodesAsGone.mockImplementation(async () => ['node6']);
        render(<DeleteNodesPage />);
        fireEvent.click(await screen.findByText('node6'));
        fireEvent.click(await screen.findByRole('button', { name: /delete/i }));
        await waitForExpect(() => {
            expect(markNodesAsGone).toBeCalledWith(['node6']);
        })
    })

    it('hide nodes from the list after deletion', async () => {
        markNodesAsGone.mockImplementation(async () => ['node6', 'node7']);
        render(<DeleteNodesPage />);
        fireEvent.click(await screen.findByText('node6'));
        fireEvent.click(await screen.findByText('node7'));
        fireEvent.click(await screen.findByRole('button', { name: /delete/i }));
        expect(await screen.findByText('node4')).toBeVisible();
        expect(await screen.queryByText('node5')).toBeVisible();
        expect(await screen.queryByText('node6')).toBeNull();
        expect(await screen.queryByText('node7')).toBeNull();
    })

    it('show success message after deletion', async () => {
        markNodesAsGone.mockImplementation(async () => ['node6', 'node7']);
        render(<DeleteNodesPage />);
        fireEvent.click(await screen.findByText('node6'));
        fireEvent.click(await screen.findByText('node7'));
        fireEvent.click(await screen.findByRole('button', { name: /delete/i }));
        expect(await screen.findByText(/successfully deleted/i)).toBeVisible();
    })
})