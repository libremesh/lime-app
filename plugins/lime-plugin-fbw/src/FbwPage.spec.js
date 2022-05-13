import { h } from "preact";
import FbwPage from './FbwPage';
import { fireEvent, screen} from '@testing-library/preact';
import '@testing-library/jest-dom';
import { render, flushPromises } from 'utils/test_utils';
import { AppContextProvider } from 'utils/app.context';
import { createNetwork, searchNetworks } from './FbwApi';
import { enableFetchMocks } from 'jest-fetch-mock';
import { getBoardData } from 'utils/api';


jest.mock('./FbwApi');
jest.mock('utils/api');
enableFetchMocks()

const advanceToChecking = async () => {
    fireEvent.click(
        await screen.findByRole('button', { name: /Create new network/i })
    );
    fireEvent.input(
        await screen.findByLabelText('Choose a name for your network'),
        { target: { value: 'ournetwork' } }
    );
    fireEvent.input(
        await screen.findByLabelText('Choose a shared password for network administration'),
        { target: { value: 'somepassword123' } }
    );
    fireEvent.input(
        await screen.findByLabelText('Re-enter the shared password'),
        { target: { value: 'somepassword123' } }
    );
    fireEvent.input(
        await screen.findByLabelText('Choose a name for this node'),
        { target: { value: 'mynode' } }
    );
    fireEvent.click(
        await screen.findByRole('button', { name: /Create network/i })
    );
    // fastforward 125 seconds of waiting time...
    for (let i = 0; i < 125; i++) {
        jest.advanceTimersByTime(1000);
        await flushPromises();
    }
}


const advanceToJoinNetwork = async () => {
    fireEvent.click(
        await screen.findByRole('button', { name: /Scan for existing networks/i })
    );
}

describe('Fbw Page', () => {
    beforeEach(() => {
        fetch.resetMocks();
        createNetwork.mockImplementation(async () => ({ status: 'done' }));
    })

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    })

    it('asks to connect to the wifi network for this node if cannot get hostname', async () => {
        fetch.mockReject();
        render(<AppContextProvider><FbwPage /></AppContextProvider>);
        await advanceToChecking();
        // eslint-disable-next-line jest/valid-expect
        expect(await screen.findByText('You should try to connect to the network ournetwork/mynode.'));
    });

    it('asks to connect to the wifi network for this node if getting different hostname ', async () => {
        fetch.mockResponse('anothernode\n');
        render(<AppContextProvider><FbwPage /></AppContextProvider>);
        await advanceToChecking();
        // eslint-disable-next-line jest/valid-expect
        expect(await screen.findByText('You are connected to another node in the network, try connecting to ournetwork/mynode'));
    });    
})


describe('Fbw Join Network Page', () => {
    beforeEach(() => {
        getBoardData.mockImplementation(async() => boardData)
        searchNetworks.mockImplementation(async () => allScanCases)
    })

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();

		// cleanup();
		// act(() => queryCache.clear());
    })

    it('join to existing network from scan results', async () => {
        render(<AppContextProvider><FbwPage /></AppContextProvider>);
        advanceToJoinNetwork()
        let tile = await screen.findByText('ql-refu-bbone')
        expect(tile).toBeInTheDocument();
    });


    it.skip('test scanning screen case downloading configuration', async () => {});
    it.skip('test scanning screen case downloaded configuration', async () => {});
    it.skip('test scanning screen case failed fetch config', async () => {});
    it.skip('test scanning screen case failed not configured yet', async () => {});
    it.skip('test scanning screen case failed download assets ', async () => {});
    
})


const allScanCases = JSON.parse(`{
    "status": "scanning",
    "networks": [
            {
                "file": "lime-community__host__ql-refu-bbone__38:AB:C0:C1:D6:70",
                "config": {
                    "wifi": {
                        ".name": "wifi",
                        ".anonymous": false,
                        "country": "TZ",
                        "ap_ssid": "quintana.libre.org.ar",
                        ".index": 2,
                        "channel_2ghz": "11",
                        "apname_ssid": "quintana.libre.org.ar/%H",
                        "modes": [
                                "ap_2ghz",
                                "apname_2ghz",
                                "ieee80211s_5ghz"
                        ],
                        "channel_5ghz": [
                                "136",
                                "60"
                        ],
                        ".type": "lime"
                    }
                }
            },
            {
                "file": "lime-community__host__ql-refu-bbone__38:AB:C0:C1:D6:71",
                "config": {
                    "wifi": {
                        ".name": "wifi",
                        "ap_ssid": "quintana.libre.org.ar"
                    }
                }
            }
    ],
    "scanned": [
        {
            "status": {"retval": true, "code" : "downloaded_config"},
            "quality": 50,
            "quality_max": 70,
            "ssid": "foo_ssid",
            "bssid": "38:AB:C0:C1:D6:70",
            "channel": 1,
            "signal": -51
          },
        {
            "status": {"retval": true, "code" : "downloading_config"},
            "quality": 52,
            "quality_max": 70,
            "ssid": "foo_ssid",
            "bssid": "38:AB:C0:C1:D6:71",
            "channel": 1,
            "signal": -53
          },
          {
            "quality": 55,
            "quality_max": 70,
            "ssid": "foo_ssid",
            "bssid": "38:AB:C0:C1:D6:72",
            "channel": 1,
            "signal": -54
          },
          {
            "status": {"retval": false, "code" : "error_download_lime_community"},
            "quality": 58,
            "quality_max": 70,
            "ssid": "foo_ssid",
            "bssid": "38:AB:C0:C1:D6:73",
            "channel": 1,
            "signal": -56
          },
          {
            "status": {"retval": false, "code" : "error_not_configured"},
            "quality": 59,
            "quality_max": 70,
            "ssid": "foo_ssid",
            "bssid": "38:AB:C0:C1:D6:74",
            "channel": 1,
            "signal": -58
          }, 
          {
            "status": {"retval": false, "code" : "error_download_lime_assets"},
            "quality": 60,
            "quality_max": 70,
            "ssid": "foo_ssid",
            "bssid": "38:AB:C0:C1:D6:75",
            "channel": 1,
            "signal": -60
          }
        
    ]
}`
)

const boardData = JSON.parse(`{
    "kernel": "4.14.215",
    "hostname": "LiMe-abc000",
    "system": "QEMU Virtual CPU version 2.5+",
    "model": "QEMU Standard PC (i440FX + PIIX, 1996)",
    "board_name": "qemu-standard-pc-i440fx-piix-1996",
    "release": {
      "distribution": "%LIME_ID%",
      "version": "%LIME_RELEASE%",
      "revision": "%LIME_REVISION%",
      "target": "x86/64",
      "description": "%LIME_DESCRIPTION%"
    }
  }`
)