// Here you define tests that closely resemble how your component is used
// Using the testing-library: https://testing-library.com

import { h } from 'preact';
import { fireEvent, screen, cleanup, act } from '@testing-library/preact';
import '@testing-library/jest-dom';
import { render } from 'utils/test_utils';
import queryCache from 'utils/queryCache';

import NetworkNodes from './src/networkNodesPage';
import { getNodes } from './src/networkNodesApi';

jest.mock('./src/networkNodesApi');

describe('networkNodes', () => {
    beforeEach(() => {
        getNodes.mockImplementation(async () => ({
            "ql-berta": {
                ipv4: '10.5.0.16',
                ipv6: 'fd0d:fe46:8ce8::8bbf:7500',
                board: 'LibreRouter v1',
                fw_version: 'LibreRouterOS 1.4'
            },
            "ql-nelson": {
                ipv4: '10.5.0.17',
                ipv6: 'fd0d:fe46:8ce8::8bbf:75bf',
                board: 'LibreRouter v1',
                fw_version: 'LibreRouterOS 1.4'
            }
        }));
    });

    afterEach(() => {
        cleanup();
        act(() => queryCache.clear());
    });

    it('test that nodes are shown', async () => {
        render(<NetworkNodes />);
        expect(await screen.findByText('ql-nelson')).toBeInTheDocument();
        expect(await screen.findByText('ql-berta')).toBeInTheDocument();
    });

    it('test that details are shown on click', async () => {
        render(<NetworkNodes />);
        const element = await screen.findByText('ql-nelson');
        fireEvent.click(element);
        expect(await screen.findByRole('link', { name: '10.5.0.17'})).toBeInTheDocument();
        expect(await screen.findByText('IPv6: fd0d:fe46:8ce8::8bbf:75bf')).toBeInTheDocument();
        expect(await screen.findByText('Device: LibreRouter v1')).toBeInTheDocument();
        expect(await screen.findByText('Firmware: LibreRouterOS 1.4')).toBeInTheDocument();
    })

});
