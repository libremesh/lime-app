import { h } from 'preact';
import { fireEvent, cleanup, act, screen } from '@testing-library/preact';
import { render } from 'utils/test_utils';
import '@testing-library/jest-dom';
import waitForExpect from 'wait-for-expect';

import FirmwarePage from './src/firmwarePage';
import { getUpgradeInfo, uploadFile, upgradeFirmware,
	upgradeConfirm, upgradeRevert, downloadRelease, getDownloadStatus, getNewVersion } from './src/firmwareApi';
import { route } from 'preact-router';
import queryCache from 'utils/queryCache';

jest.mock('./src/firmwareApi');

const secureRollbackText =
	/this device supports secure rollback to previous version if something goes wrong/i;
const noSecureRollbackText =
	/this device does not support secure rollback to previous version if something goes wrong/i;

function flushPromises() {
	return new Promise(resolve => setImmediate(resolve));
}

async function stepSelectFile(fileName='test.bin') {
	const fileInput = await screen.findByLabelText(/select file/i);
	const file = new File(['(⌐□_□)'], fileName);
	Object.defineProperty(fileInput, 'files', {
		value: [file]
	});
	Object.defineProperty(fileInput, 'value', {
		value: file.name
	});
	return file
}

async function stepSubmit() {
	const submitButton = await screen.findByRole('button', {name: /upgrade/i});
	fireEvent.submit(submitButton);
}

async function triggerUpgrade() {
	const file = stepSelectFile();
	await stepSubmit()
	return file;
}

describe('firmware form', () => {
	beforeAll(() => {
		jest.useFakeTimers();
	})

	beforeEach(() => {
		getUpgradeInfo.mockImplementation(async () => ({
			suCounter: -1,
			is_upgrade_confirm_supported: true
		}));
		uploadFile.mockImplementation(async () => true);
		upgradeFirmware.mockImplementation(async () => true);
		getDownloadStatus.mockImplementation(async () => ({
			download_status: 'not-initiated'
		}));
		getNewVersion.mockImplementation(async () => ({}))
		downloadRelease.mockImplementation(async () => ({}));
	});

	afterEach(() => {
		cleanup();
		act(() => queryCache.clear());
	});
	
	afterAll(() => {
		jest.useRealTimers();
	})

	it('shows up a legend telling confirm-mechanism is available when it is', async () => {
		render(<FirmwarePage />);
		expect(await screen.findByText(secureRollbackText)).toBeInTheDocument();
		expect(screen.queryByText(noSecureRollbackText)).not.toBeInTheDocument();
	});


	it('shows up a legend telling confirm-mechanism is not available when it is not', async () => {
		getUpgradeInfo.mockImplementation(async () => ({
			status: 'ok', suCounter: -1,
			is_upgrade_confirm_supported: false
		}));
		render(<FirmwarePage />);
		expect(await screen.findByText(noSecureRollbackText)).toBeInTheDocument();
		expect(screen.queryByText(secureRollbackText)).not.toBeInTheDocument();
	});

	it('shows up a legend to upload a new firmware image from the device', async () => {
		render(<FirmwarePage />);
		expect(await screen.findByText(/upload firmware image from your device/i)).toBeInTheDocument();
	});

	it('shows up a file input to select a firmware image', async () => {
		render(<FirmwarePage />);
		expect(await screen.findByText(/select file/i)).toBeInTheDocument();
	});

	it('shows up a button to perform the firmware upgrade', async () => {
		render(<FirmwarePage />);
		expect(await screen.findByRole('button', {name: /upgrade/i})).toBeEnabled();
	});

	it('shows error if upgrading without selecting a file', async () => {
		render(<FirmwarePage />);
		expect(screen.queryByText('Please select a file', 'i')).toBeNull()
		stepSubmit()
		expect(await screen.findByText('Please select a file', 'i')).toBeInTheDocument();
	});

	it('shows error if upgrading with a file with invalid extension', async () => {
		render(<FirmwarePage />);
		expect(screen.queryByText('Please select a .sh or .bin file', 'i')).toBeNull()
		stepSelectFile('myfile.unsupportedextension')
		stepSubmit()
		expect(await screen.findByText('Please select a .sh or .bin file', 'i')).toBeInTheDocument();
	});

	it('calls uploadFile to upload the file', async () => {
		render(<FirmwarePage />);
		const file = await triggerUpgrade();
		await waitForExpect(() => {
			expect(uploadFile).toBeCalledWith(file);
		})
	});
	
	it('calls the firmware upgrade endpoint with the path returned by upload file', async () => {
		uploadFile.mockImplementation(async () => '/tmp/some/given/path');
		render(<FirmwarePage />);
		triggerUpgrade();
		await waitForExpect(() => {
			expect(upgradeFirmware).toHaveBeenCalledWith('/tmp/some/given/path');
		})
	});

	it('shows up an error message if firmware validation fails', async () => {
		upgradeFirmware.mockImplementation(async () => Promise.reject('Invalid firmware'));
		const noteText = /The selected image is not valid for the target device/i;
		render(<FirmwarePage />);
		expect(screen.queryByText(noteText)).not.toBeInTheDocument();
		triggerUpgrade();
		expect(await screen.findByText(noteText)).toBeInTheDocument();
	});

	it('shows up a legend asking the user to wait for the upgrade to finish', async () => {
		render(<FirmwarePage />);
		triggerUpgrade();
		const noteText1 = new RegExp(
			'The firmware is being upgraded...', 'i');
		expect(await screen.findByText(noteText1)).toBeInTheDocument();
		const noteText2 = new RegExp(
			'Please wait patiently for .* seconds and do not disconnect the device', 'i');
		expect(await screen.findByText(noteText2)).toBeInTheDocument();
	});

	it('shows a button to reload app after upgrade', async () => {
		render(<FirmwarePage />);
		triggerUpgrade();
		const noteText1 = new RegExp(
			'The firmware is being upgraded...', 'i');
		await screen.findByText(noteText1);
		act(() => {
			jest.advanceTimersByTime(181 * 1000)
		})
		expect(await screen.findByRole('button', {name: /try reloading the app/i})).toBeEnabled()
	});

	it('shows up a legend telling the user to confirm the upgrade when it is needed', async () => {
		render(<FirmwarePage />);
		triggerUpgrade();
		const noteText1 = new RegExp(
			'The firmware is being upgraded...', 'i');
		await screen.findByText(noteText1);
		act(() => {
			jest.advanceTimersByTime(181 * 1000)
		})
		const noteText2 = new RegExp(
			'When reloading the app you will be asked to confirm the upgrade,'
			+ ' otherwise it will be reverted', 'i');
		expect(await screen.findByText(noteText2)).toBeInTheDocument();

	})

	it('shows download option when realease is available', async () => {
		getNewVersion.mockImplementation(async () => ({
			version: 'SomeNewVersionName'
		}));
		render(<FirmwarePage />)
		expect(await screen.findByText('SomeNewVersionName is now available')).toBeInTheDocument()
	})

	it('calls downdloadRelease when selecting download option', async () => {
		getNewVersion.mockImplementation(async () => ({
			version: 'SomeNewVersionName'
		}));
		render(<FirmwarePage />)
		downloadRelease.mockImplementation(() =>
			new Promise(res => setTimeout(res, 10))); // let loading enter screen
		const downloadButton = await screen.findByRole('button', {name: /Download/i})
		fireEvent.click(downloadButton);
		expect(await screen.findByLabelText('loading')).toBeInTheDocument();
		await waitForExpect(() => {
			expect(downloadRelease).toHaveBeenCalled();
		})
	})

	it('shows downloading message when downloading new release', async () => {
		getNewVersion
			.mockImplementation(async () => ({version: 'SomeNewVersionName'}));
		getDownloadStatus
			.mockImplementation(async () => ({download_status: 'downloading'}));
		render(<FirmwarePage />)
		expect(await screen.findByText(/Downloading/i)).toBeInTheDocument();
		expect(await screen.findByRole('button', {name: /Upgrade to SomeNewVersionName/i}))
			.toBeDisabled();
	})

	it('shows an enabled button to upgrade from release when its downloaded', async () => {
		getNewVersion
			.mockImplementation(async () => ({version: 'SomeNewVersionName'}));
		getDownloadStatus
			.mockImplementation(async () => ({download_status: 'downloaded'}));
		render(<FirmwarePage />)
		await flushPromises();
		expect(await screen.findByRole('button', {name: /Upgrade to SomeNewVersionName/i}))
			.toBeEnabled();
	})

	it('shows up a legend asking to wait for the upgrade to finish when upgrading from release', async () => {
		getNewVersion
			.mockImplementation(async () => ({version: 'SomeNewVersionName'}));
		getDownloadStatus
			.mockImplementation(async () => (
				{ download_status: 'downloaded', fw_path: '/tmp/upgrade.sh' }
			));
		render(<FirmwarePage />)
		const upgradeButton = await screen.findByRole('button', {name: /Upgrade to SomeNewVersionName/i});
		fireEvent.click(upgradeButton);
		const noteText1 = new RegExp(
			'The firmware is being upgraded...', 'i');
		expect(await screen.findByText(noteText1)).toBeInTheDocument();
		const noteText2 = new RegExp(
			'Please wait patiently for .* seconds and do not disconnect the device', 'i');
		expect(await screen.findByText(noteText2)).toBeInTheDocument();
	});

	it('calls upgradeFirmware with the fw_path from downloadStatus when upgrading from release', async () => {
		getNewVersion
			.mockImplementation(async () => ({version: 'SomeNewVersionName'}));
		getDownloadStatus
			.mockImplementation(async () => (
				{ download_status: 'downloaded', fw_path: '/tmp/upgrade.sh' }
			));
		upgradeFirmware.mockImplementation(() => new Promise(res => setTimeout(res, 10)));
		render(<FirmwarePage />)
		const upgradeButton = await screen.findByRole('button', {name: /Upgrade to SomeNewVersionName/i});
		fireEvent.click(upgradeButton);
		expect(await screen.findByLabelText('loading')).toBeInTheDocument();
		expect(upgradeFirmware).toHaveBeenCalledWith('/tmp/upgrade.sh');
	});

	it('show downloading message until download finished successfully', async () => {
		getNewVersion.mockImplementation(jest.fn(async () => ({
			version: 'SomeNewVersionName'
		})))
		getDownloadStatus
			.mockImplementationOnce(async () => ({download_status: 'not-initiated'}))
			.mockImplementationOnce(async () => ({download_status: 'downloading'}))
			.mockImplementationOnce(async () => ({download_status: 'downloaded'}));
		render(<FirmwarePage />)
		const downloadButton = await screen.findByRole('button', {name: /Download/i})
		fireEvent.click(downloadButton);
		expect(await screen.findByText(/Downloading/i)).toBeInTheDocument();
		act(() => {
			jest.advanceTimersByTime(12000);
		})
		expect(await screen.findByRole('button', {name: /Upgrade to SomeNewVersionName/i})).toBeDisabled();
		act(() => {
			jest.advanceTimersByTime(12000);
		})
		await flushPromises();
		expect(await screen.findByRole('button', {name: /Upgrade to SomeNewVersionName/i})).toBeEnabled();
	})
});


describe('firmware confirm', () => {
	beforeEach(() => {
		// Reset default mock implementations
		getUpgradeInfo.mockImplementation(jest.fn(async () => ({
			suCounter: 340,
			is_upgrade_confirm_supported: true
		})));
		upgradeConfirm.mockImplementation(jest.fn(async () => true));
		upgradeRevert.mockImplementation(jest.fn(async () => true));
	});

	afterEach(() => {
		cleanup();
		act(() => queryCache.clear());
	});

	it('shows two buttons, one for confirm, one for revert', async () => {
		render(<FirmwarePage />);
		expect(await screen.findByRole('button', {name: /confirm/i})).toBeEnabled();
		expect(await screen.findByRole('button', {name: /revert/i})).toBeEnabled();
	})

	it('routes to home page when clicking on confirm', async () => {
		render(<FirmwarePage />);
		const button = await screen.findByRole('button', {name: /confirm/i});
		fireEvent.click(button);
		await waitForExpect(() => {
			expect(route).toHaveBeenCalledWith('/')
		})
	})

	it('shows a legend saying device will reboot when reverting', async () => {
		render(<FirmwarePage />);
		const button = await screen.findByRole('button', {name: /revert/i});
		fireEvent.click(button);
		expect(await screen.findByText(
			new RegExp('Reverting to previous version', 'i'))).toBeInTheDocument();
		const noteText = new RegExp('Please wait while the device reboots, and reload the app', 'i');
		expect(await screen.findByText(noteText)).toBeInTheDocument();
	})
})
