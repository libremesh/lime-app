import { h } from 'preact';
import { fireEvent, act, screen } from '@testing-library/preact';
import '@testing-library/jest-dom';
import waitForExpect from 'wait-for-expect';

import DeleteNodesPage from './src/deleteNodesPage';
import queryCache from 'utils/queryCache';
import { getNodes, markNodesAsGone } from 'plugins/lime-plugin-network-nodes/src/networkNodesApi';
import { render } from 'utils/test_utils';

jest.mock('plugins/lime-plugin-network-nodes/src/networkNodesApi');

describe('delete nodes page', () => {
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
        getNodes.mockClear();
        markNodesAsGone.mockClear();
    });
    
    it('shows the list of unreachable nodes only', async () => {
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
    });

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
