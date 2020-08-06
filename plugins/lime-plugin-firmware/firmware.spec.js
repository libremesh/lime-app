import { h } from 'preact';
import { render, fireEvent, cleanup } from '@testing-library/preact';
import '@testing-library/jest-dom';
import waitForExpect from 'wait-for-expect';

import FirmwarePage from './src/firmwarePage';
import { upgradeConfirmIsAvailable, uploadFile, validateFirmware, upgradeFirmware,
	upgradeConfirm, upgradeRevert } from './src/firmwareApi';
import { useAppContext } from '../../src/utils/app.context';
import { route } from 'preact-router';

jest.mock('i18n-js', () => ({
	t: jest.fn(x => x)
}));

jest.mock('./src/firmwareApi');
jest.mock('../../src/utils/app.context');

const mockUhttpdService = {
	call: () => {}
};

const secureRollbackText =
	/this device supports secure rollback to previous version if something goes wrong/i;
const noSecureRollbackText =
	/this device does not support secure rollback to previous version if something goes wrong/i;

function triggerUpgrade(getByLabelText, getByRole, preserveConfig=false) {
	const fileInput = getByLabelText(/select file/i);
	const file = new File(['(⌐□_□)'], 'test.bin');
	Object.defineProperty(fileInput, 'files', {
		value: [file]
	});
	if (preserveConfig) {
		const preserveConfigCheckbox = getByLabelText(/preserve config/i);
		fireEvent.click(preserveConfigCheckbox);
	}
	const submitButton = getByRole('button', /upgrade/i);
	fireEvent.click(submitButton);
	return file
}

describe('firmware form', () => {
	beforeEach(() => {
		// Reset default mock implementations
		upgradeConfirmIsAvailable.mockImplementation(jest.fn(async () => true));
		uploadFile.mockImplementation(jest.fn(async () => true));
		validateFirmware.mockImplementation(jest.fn(async () => true));
		upgradeFirmware.mockImplementation(jest.fn(async () => true));
		useAppContext.mockImplementation(() => ({uhttpdService: mockUhttpdService}))
	});

	afterEach(() => {
		cleanup();
	});

	it('shows up a legend telling confirm-mechanism is available when it is', async () => {
		upgradeConfirmIsAvailable.mockImplementation(async () => true);
		const { findByText, queryByText } = render(<FirmwarePage />);
		expect(await findByText(secureRollbackText)).toBeInTheDocument();
		expect(queryByText(noSecureRollbackText)).not.toBeInTheDocument();
	});


	it('shows up a legend telling confirm-mechanism is not available when it is not', async () => {
		upgradeConfirmIsAvailable.mockImplementation(async () => false);
		const { findByText, queryByText } = render(<FirmwarePage />);
		expect(await findByText(noSecureRollbackText)).toBeInTheDocument();
		expect(queryByText(secureRollbackText)).not.toBeInTheDocument();
	});

	it('shows up a legend to upload a new firmware image from the device', () => {
		const { getByText } = render(<FirmwarePage />);
		expect(getByText(/upload firmware image from your device/i)).toBeInTheDocument();
	});

	it('shows up a note reminding the user to verify the firmware image by their own', () => {
		const { getByText } = render(<FirmwarePage />);
		const noteText = new RegExp('please verify that the image is for the target device' +
			' and that you trust its origin', 'i');
		expect(getByText(noteText)).toBeInTheDocument();
	});

	it('shows up a file input to select a firmware image', () => {
		const { getByLabelText } = render(<FirmwarePage />);
		expect(getByLabelText(/select file/i)).toBeInTheDocument();
	});

	it('shows up a button to perform the firmware upgrade', () => {
		const { getByRole } = render(<FirmwarePage />);
		expect(getByRole('button', {name: /upgrade/i})).toBeEnabled();
	});

	it('calls the cgi-io endpoint to upload the file', async () => {
		const { getByLabelText, getByRole} = render(<FirmwarePage />);
		const file = triggerUpgrade(getByLabelText, getByRole);
		await waitForExpect(() => {
			expect(uploadFile).toBeCalledWith(file);
		})
	});

	it('calls the firmware validation endpoint once uploaded', async () => {
		const { getByLabelText, getByRole} = render(<FirmwarePage />);
		const { uhttpdService } = useAppContext();
		triggerUpgrade(getByLabelText, getByRole);
		await waitForExpect(() => {
			expect(validateFirmware).toHaveBeenCalledWith(uhttpdService);
			expect(validateFirmware).toHaveBeenCalledAfter(uploadFile);
		})
	});

	it('shows up an error message if firmware validation fails', async () => {
		uploadFile.mockImplementation(async () => true);
		validateFirmware.mockImplementation(async () => Promise.reject());
		const noteText = /the selected image is not a valid for the target device/i;
		const { getByLabelText, getByRole, queryByText, findByText} = render(<FirmwarePage />);
		expect(queryByText(noteText)).not.toBeInTheDocument();
		triggerUpgrade(getByLabelText, getByRole);
		expect(await findByText(noteText)).toBeInTheDocument();

	});


	it('calls the firmware upgrade endpoint if validation success', async () => {
		uploadFile.mockImplementation(async () => true);
		validateFirmware.mockImplementation(async () => true);
		const { getByLabelText, getByRole} = render(<FirmwarePage />);
		const { uhttpdService } = useAppContext();
		triggerUpgrade(getByLabelText, getByRole);
		await waitForExpect(() => {
			expect(upgradeFirmware).toHaveBeenCalledWith(uhttpdService, false);
			expect(upgradeFirmware).toHaveBeenCalledAfter(validateFirmware);
		})
	});

	it('calls the firmware upgrade endpoint with preserve config when requested', async () => {
		uploadFile.mockImplementation(async () => true);
		validateFirmware.mockImplementation(async () => true);
		const { uhttpdService } = useAppContext();
		const { getByLabelText, getByRole} = render(<FirmwarePage />);
		const preserveConfig = true;
		triggerUpgrade(getByLabelText, getByRole, preserveConfig);
		await waitForExpect(() => {
			expect(upgradeFirmware).toHaveBeenCalledWith(uhttpdService, true);
		})
	});

	it('shows up a legend asking the user to wait for reboot after upgrade, preserve config', async () => {
		uploadFile.mockImplementation(async () => true);
		validateFirmware.mockImplementation(async () => true);
		upgradeFirmware.mockImplementation(async () => true);
		const { findByText, getByLabelText, getByRole} = render(<FirmwarePage />);
		const preserveConfig = true;
		triggerUpgrade(getByLabelText, getByRole, preserveConfig);
		const noteText = new RegExp('Please wait while the device reboot and reload the app', 'i');
		expect(await findByText(noteText)).toBeInTheDocument();
	});

	it('shows up a legend asking the user to wait for reboot after upgrade, not preserve config', async () => {
		uploadFile.mockImplementation(async () => true);
		validateFirmware.mockImplementation(async () => true);
		upgradeFirmware.mockImplementation(async () => true);
		const { findByText, getByLabelText, getByRole} = render(<FirmwarePage />);
		const preserveConfig = false;
		triggerUpgrade(getByLabelText, getByRole, preserveConfig);
		const noteText = new RegExp(
			'The device will reboot, you may need to connect to the new wireless network', 'i');
		expect(await findByText(noteText)).toBeInTheDocument();
	});
});


describe('firmware confirm', () => {
	beforeEach(() => {
		// Reset default mock implementations
		upgradeConfirm.mockImplementation(jest.fn(async () => true));
		upgradeRevert.mockImplementation(jest.fn(async () => true));
		useAppContext.mockImplementation(() => (
			{uhttpdService: mockUhttpdService, suCounter: 630})
		);
	});

	afterEach(() => {
		cleanup();
	});

	it('shows two buttons, one for confirm, one for revert', () => {
		const { getByRole } = render(<FirmwarePage />);
		expect(getByRole('button', {name: /confirm/i})).toBeEnabled();
		expect(getByRole('button', {name: /revert/i})).toBeEnabled();
	})

	it('routes to home page when clicking on confirm', async () => {
		const { getByRole } = render(<FirmwarePage />);
		const button = getByRole('button', {name: /confirm/i});
		fireEvent.click(button);
		await waitForExpect(() => {
			expect(route).toHaveBeenCalledWith('/')
		})
	})

	it('shows a legend saying device will reboot when reverting', async () => {
		const { getByRole, findByText } = render(<FirmwarePage />);
		const button = getByRole('button', {name: /revert/i});
		fireEvent.click(button);
		expect(await findByText(
			new RegExp('Reverting to previous version', 'i'))).toBeInTheDocument();
		const noteText = new RegExp('Please wait while the device reboot and reload the app', 'i');
		expect(await findByText(noteText)).toBeInTheDocument();
	})
})
