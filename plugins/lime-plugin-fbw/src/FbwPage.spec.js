
import FbwPage from './FbwPage';
import { fireEvent, screen, within, act, cleanup } from '@testing-library/preact';
import '@testing-library/jest-dom';
import { render, flushPromises } from 'utils/test_utils';
import { AppContextProvider } from 'utils/app.context';
import { createNetwork, setNetwork, scanStart, getStatus, scanStop} from './FbwApi';
import { enableFetchMocks } from 'jest-fetch-mock';
import { getBoardData } from 'utils/api';
import waitForExpect from 'wait-for-expect';
import queryCache from 'utils/queryCache';



jest.mock('./FbwApi');
jest.mock('utils/api');
enableFetchMocks()

const advanceToChecking = async () => {
    fireEvent.click(
        await screen.findByRole('button', { name: /Create network/i })
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
        await screen.findByRole('button', { name: /Search network/i })
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
        expect(await screen
            .findByText('You should try to connect to the network ournetwork/mynode.'))
            .toBeInTheDocument();
    });

    it('asks to connect to the wifi network for this node if getting different hostname ', async () => {
        fetch.mockResponse('anothernode\n');
        render(<AppContextProvider><FbwPage /></AppContextProvider>);
        await advanceToChecking();
        expect(await screen
            .findByText('You are connected to another node in the network, try connecting to ournetwork/mynode'))
            .toBeInTheDocument();
    });    
})


describe('Fbw Join Network Page', () => {
    
    beforeEach(() => {
        render(<AppContextProvider><FbwPage /></AppContextProvider>);
    })

    beforeAll(() => {
        getBoardData.mockImplementation(async() => boardData)
        getStatus.mockImplementation(async () => allScanCases)
        scanStart.mockImplementation(async () => scanActionSuccess)
    });

    afterEach(() => {
		cleanup();
		act(() => queryCache.clear());
    })

    it('join to existing network from scan results', async () => {
        await advanceToJoinNetwork()
        await waitForExpect(async () => {
            expect(await screen.findByText('ql-refu-bbone')).toBeInTheDocument();
          });
        let tile = within(await screen.findByTestId('38:AB:C0:C1:D6:70'.replaceAll(":", "_")))        
        fireEvent.click(
            await tile.findByRole('button', { name: /Select/i })
        )
        fireEvent.input(
            await screen.findByLabelText('Choose a name for this node'),
            { target: { value: 'mynode' } }
        );
        setNetwork.mockImplementation(async () => setNetworkRes)
        
        fireEvent.click(
            await screen.findByRole('button', { name: /Set network/i })
        )
        await waitForExpect(() => {
            expect(setNetwork).toHaveBeenCalledWith(
                expect.objectContaining({
                    file: 'lime-community__host__ql-refu-bbone__38:AB:C0:C1:D6:70',
                    hostname: 'mynode',
                })
            )
        });
        expect(await screen.findByText('Setting network')).toBeInTheDocument();
    });


    it('shows community name for results with successful config download', async () => { 
        await advanceToJoinNetwork()
        await waitForExpect(async () => {
            expect(await screen.findByText('(quintana.libre.org.ar)')).toBeInTheDocument();
        });
    });

    it('shows "Fetching name" when config community file is downloading', async () => {  
        await advanceToJoinNetwork()
        await waitForExpect(async () => {
            expect(await screen.findByText('Fetching name')).toBeInTheDocument();
        });
    });

    it('shows "Connection attempt not yet started" when a network is scanned but the config donwload is not started', async () => {  
        await advanceToJoinNetwork()
        await waitForExpect(async () => {
            expect(await screen.findByText('Connection attempt not yet started')).toBeInTheDocument();
        });
    });

    it('shows "Error downloading lime community" when config file was not downloaded properly', async () => {  
        await advanceToJoinNetwork()
        await waitForExpect(async () => {
            expect(await screen.findByText('Error downloading lime community')).toBeInTheDocument();
        });
    });
    it('shows "Error destination network is not configured yet" when destination node is not configured', async () => {  
        await advanceToJoinNetwork()
        await waitForExpect(async () => {
            expect(await screen.findByText('Error destination network is not configured yet')).toBeInTheDocument();
        });
    });

    it('shows "Error downloading lime assets" if error when downloading community assets', async () => {  
        await advanceToJoinNetwork()
        await waitForExpect(async () => {
            expect(await screen.findByText('Error downloading lime assets')).toBeInTheDocument();
        });
    });

    it('shows loader when status is scanning', async () => {
        await advanceToJoinNetwork()
        await waitForExpect(async () => {
            expect(await screen.findByTestId('loading')).toBeInTheDocument();
        });
    })

    it('not shows loader when status is scanned', async () => {
        getStatus.mockImplementation(async () => {
            allScanCases.status = 'scanned'
            return allScanCases
        })

        await advanceToJoinNetwork()
        await waitForExpect(async () => {
            expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
        });
    })

    it('return to select action when cancel is pressed on scan list page', async () => {
        scanStop.mockImplementation(async () => scanActionSuccess )

        await advanceToJoinNetwork()
        await waitForExpect(async () => {
            expect(await screen.findByText('ql-refu-bbone')).toBeInTheDocument();
          });

        fireEvent.click(
            await screen.findByRole('button', { name: /Cancel/i })
        )
        expect(await screen.findByText('Configure your network')).toBeInTheDocument();
        expect(scanStop).toHaveBeenCalled()      
    })

    it('return to select action when cancel is pressed on join network page', async () => {
        scanStop.mockImplementation(async () => scanActionSuccess )

        await advanceToJoinNetwork()
        let tile = within(await screen.findByTestId('38:AB:C0:C1:D6:70'.replaceAll(":", "_")))        
        fireEvent.click(
            await tile.findByRole('button', { name: /Select/i })
        )
        fireEvent.click(
            await screen.findByRole('button', { name: /Cancel/i })
        )
        expect(await screen.findByText('Configure your network')).toBeInTheDocument();

        expect(scanStop).toHaveBeenCalled()
    })

    it('shows an error toast when stop scan could not be completed', async () => {

        scanStop.mockImplementation(async () => scanActionFailure )

        await advanceToJoinNetwork()
        await waitForExpect(async () => {
            expect(await screen.findByText('ql-refu-bbone')).toBeInTheDocument();
          });

        fireEvent.click(
            await screen.findByRole('button', { name: /Cancel/i })
        )
        expect(await screen.findByText('Error stopping scan')).toBeInTheDocument();
        expect(scanStop).toHaveBeenCalled()  
    })
})


const setNetworkRes = JSON.parse(`{ 
    "status": "configuring"
}`)

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

const scanActionSuccess = JSON.parse('{"status": true}')
const scanActionFailure = JSON.parse('{"status": false}')

const allScanCases = JSON.parse(`{
    "lock" : true,
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