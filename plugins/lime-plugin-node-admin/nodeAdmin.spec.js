import { h } from 'preact';
import { fireEvent, screen, cleanup, act } from '@testing-library/preact';
import '@testing-library/jest-dom';
import { render } from 'utils/test_utils';
import queryCache from 'utils/queryCache';

import NodeAdmin from './src/nodeAdminPage';
import { getAPsData } from './src/nodeAdminApi';
import { getBoardData } from 'utils/api';
import { route } from 'preact-router';

jest.mock('./src/nodeAdminApi');
jest.mock('utils/api');

describe('nodeAdmin', () => {
    beforeEach(() => {
        getAPsData.mockImplementation(async () => ({
            node_ap: { has_password: false },
            community_ap: { community: { enabled: true }, enabled: true, ssid: 'quintana-libre.org.ar' },
        }));
        getBoardData.mockImplementation(async () => ({
            hostname: 'node-hostname'
        }));
    });

    afterEach(() => {
        cleanup();
        act(() => queryCache.clear());
    });

    it('shows hostname config', async () => {
        render(<NodeAdmin />);
        expect(await screen.findByText('Node Name')).toBeInTheDocument();
        expect(await screen.findByText('node-hostname')).toBeInTheDocument();
    });

    it('routes to hostname config screen when clicking on hostname', async () => {
        render(<NodeAdmin />);
        fireEvent.click(await screen.findByText('node-hostname'));
        expect(route).toHaveBeenCalledWith('/nodeadmin/hostname');
    });

    it('shows wifi config when no password', async () => {
        render(<NodeAdmin />);
        expect(await screen.findByText('Wifi Password')).toBeInTheDocument();
        expect(await screen.findByText('No password')).toBeInTheDocument();
    });

    it('shows wifi config with password', async () => {
        getAPsData.mockImplementation(async () => ({
            node_ap: { has_password: true },
            community_ap: { community: { enabled: true }, enabled: true, ssid: 'quintana-libre.org.ar' },
        }));
        render(<NodeAdmin />);
        expect(await screen.findByText('Wifi Password')).toBeInTheDocument();
        expect(await screen.findByText('********')).toBeInTheDocument();
    });

    it('routes to password wifi config screen when clicking on wifi', async () => {
        render(<NodeAdmin />);
        fireEvent.click(await screen.findByText('Wifi Password'));
        expect(route).toHaveBeenCalledWith('/nodeadmin/wifipassword');
    });

    it('show community roaming ap config when disabled', async () => {
        getAPsData.mockImplementation(async () => ({
            node_ap: { has_password: true },
            community_ap: { community: { enabled: true }, enabled: false, ssid: 'quintana-libre.org.ar' }
        }));
        render(<NodeAdmin />);
        expect(await screen.findByText('Community Roaming AP')).toBeInTheDocument();
        expect(await screen.findByText('Opens the "quintana-libre.org.ar" AP in this node')).toBeInTheDocument();
        expect(await screen.findByText('Disabled')).toBeInTheDocument();
    });

    it('shows community roaming ap config when enabled', async () => {
        getAPsData.mockImplementation(async () => ({
            node_ap: { has_password: true },
            community_ap: { community: { enabled: true }, enabled: true }
        }));
        render(<NodeAdmin />);
        expect(await screen.findByText('Community Roaming AP')).toBeInTheDocument();
        expect(await screen.findByText('Enabled')).toBeInTheDocument();
    });

    it('routes to community roaming ap screen when clicking on it', async () => {
        render(<NodeAdmin />);
        fireEvent.click(await screen.findByText('Community Roaming AP'));
        expect(route).toHaveBeenCalledWith('/nodeadmin/roaming-ap');
    });

});
