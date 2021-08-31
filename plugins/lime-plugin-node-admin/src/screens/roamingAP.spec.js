
import { h } from 'preact';

import { screen, fireEvent, cleanup, act } from '@testing-library/preact';
import '@testing-library/jest-dom';
import waitForExpect from 'wait-for-expect';

import { render } from 'utils/test_utils';
import queryCache from 'utils/queryCache';

import RoamingAPPage from './roamingAP';
import { getCommunityName } from 'utils/api';

import { setupRoamingAP, getWifiData } from '../nodeAdminApi';

jest.mock('utils/api');
jest.mock('../nodeAdminApi');

const findCheckbox = async () =>
    screen.findByLabelText("Enable Community Roaming AP");

const findSubmitButton = async () =>
    screen.findByRole('button', { name: "Save" });

describe('roaming ap config', () => {
    beforeEach(() => {
        getCommunityName.mockImplementation(async () => 'QuintanaLibre');
        getWifiData.mockImplementation(async () =>
            ({ community_ap: { community: { enabled: true }, enabled: true, ssid: 'quintana-libre.org.ar' } })
        );
        setupRoamingAP.mockImplementation(async () => null);
    });


    afterEach(() => {
        cleanup();
        getWifiData.mockClear();
        setupRoamingAP.mockClear();
        act(() => queryCache.clear());
    });

    it('shows a text explaining the config', async () => {
        render(<RoamingAPPage />);
        expect(await screen.findByText('Opens the "quintana-libre.org.ar" AP in this node')).toBeVisible();
        expect(await screen.findByText('This AP is the same in all nodes that enable it, allowing devices to move around the network territory without losing connection')).toBeVisible();
    });

    it('shows the default value for the community, case disabled', async () => {
        getWifiData.mockImplementation(async () =>
            ({ community_ap: { community: { enabled: false }, enabled: true } })
        );
        render(<RoamingAPPage />);
        expect(await screen.findByText('It is disabled by default in QuintanaLibre')).toBeVisible();
    });

    it('shows the default value for the community case enabled', async () => {
        getWifiData.mockImplementation(async () =>
            ({ community_ap: { community: { enabled: true }, enabled: true } })
        );
        render(<RoamingAPPage />);
        expect(await screen.findByText('It is enabled by default in QuintanaLibre')).toBeVisible();
    });

    it('shows an unchecked switch for enabling the ap when it is disabled in the node', async () => {
        getWifiData.mockImplementation(async () =>
            ({ community_ap: { community: { enabled: true }, enabled: false } })
        );
        render(<RoamingAPPage />);
        expect(await findCheckbox()).not.toBeChecked();
    });

    it('shows a checked switch for enabling the ap when it enabled', async () => {
        render(<RoamingAPPage />);
        expect(await findCheckbox()).toBeChecked();
    });

    it('calls api endpoint for disabling ap when switched off', async () => {
        getWifiData.mockImplementation(async () =>
            ({ community_ap: { community: { enabled: true }, enabled: true, ssid: 'quintana-libre.org.ar' } })
        );
        render(<RoamingAPPage />);
        fireEvent.click(await findCheckbox());
        fireEvent.click(await findSubmitButton());
        await waitForExpect(() => {
            expect(setupRoamingAP).toBeCalledWith({
                enabled: false
            });
        });
    });

    it('calls api endpoint for disabling ap when switched on', async () => {
        getWifiData.mockImplementation(async () =>
            ({ community_ap: { community: { enabled: true }, enabled: false, ssid: 'quintana-libre.org.ar' } })
        );
        render(<RoamingAPPage />);
        fireEvent.click(await findCheckbox());
        fireEvent.click(await findSubmitButton());
        await waitForExpect(() => {
            expect(setupRoamingAP).toBeCalledWith({
                enabled: true
            });
        });
    });
});
