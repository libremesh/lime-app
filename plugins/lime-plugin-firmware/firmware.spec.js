import { h } from 'preact';
import { render, fireEvent, cleanup } from '@testing-library/preact';
import '@testing-library/jest-dom';
import FirmwarePage from './src/firmwarePage';
import { upgradeConfirmIsAvailable, uploadFile, validateFirmware, upgradeFirmware } from './src/firmwareApi';
import { useAppContext } from '../../src/utils/app.context';

jest.mock('i18n-js', () => ({
	t: jest.fn(x => x)
}));

jest.mock('./src/firmwareApi');
jest.mock('../../src/utils/app.context');

const secureRollbackText =
	/this device supports secure rollback to previous version if something goes wrong/i;
const noSecureRollbackText =
	/this device does not support secure rollback to previous version if something goes wrong/i;

function uploadFileStep(getByLabelText, getByRole) {
	const fileInput = getByLabelText(/select file/i);
	const file = new File(['(⌐□_□)'], 'test.bin');
	Object.defineProperty(fileInput, 'files', {
		value: [file]
	});
	const submitButton = getByRole('button', /upload file/i);
	fireEvent.click(submitButton);
}

describe('firmware page', () => {
	beforeEach(() => {
		// Reset default mock implementations
		upgradeConfirmIsAvailable.mockImplementation(jest.fn(async () => true));
		uploadFile.mockImplementation(jest.fn(async () => true));
		validateFirmware.mockImplementation(jest.fn(async () => true));
		upgradeFirmware.mockImplementation(jest.fn(async () => true));
		useAppContext.mockImplementation(jest.fn(() => ({
			uhttpdService: jest.fn()
		})))
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

	it('shows up a button to submit firmware image', () => {
		const { getByRole } = render(<FirmwarePage />);
		expect(getByRole('button', {name: /upload file/i})).toBeEnabled();
	});

	it('calls the cgi-io endpoint to upload the file', () => {
		const { getByLabelText, getByRole} = render(<FirmwarePage />);
		uploadFileStep(getByLabelText, getByRole);
		expect(uploadFile).toBeCalled(); // TODO set called with params
	});

	it('calls the firmware validation endpoint once uploaded', () => {
		const { getByLabelText, getByRole} = render(<FirmwarePage />);
		uploadFileStep(getByLabelText, getByRole);
		expect(validateFirmware).toHaveBeenCalledAfter(uploadFile); // TODO set called with params
	});

	it('shows up an error message if firmware validation fails', async () => {
		uploadFile.mockImplementation(async () => true);
		validateFirmware.mockImplementation(async () => false);
		const noteText = /the selected image is not a valid for the target device/i;
		const { getByLabelText, getByRole, queryByText, findByText} = render(<FirmwarePage />);
		expect(queryByText(noteText)).not.toBeInTheDocument();
		uploadFileStep(getByLabelText, getByRole);
		expect(await findByText(noteText)).toBeInTheDocument();

	});

	it('shows up a button to perform the firmware upgrade if validation doesnt fail', async () => {
		const { getByLabelText, getByRole, queryByRole, findByRole} = render(<FirmwarePage />);
		expect(queryByRole('button', {name: /upgrade now/i})).not.toBeInTheDocument();
		uploadFileStep(getByLabelText, getByRole);
		expect(await findByRole('button', {name: /upgrade now/i})).toBeEnabled();
	});

	it('calls the firmware upgrade endpoint when clicking the button', async () => {
		const { getByLabelText, getByRole, findByRole} = render(<FirmwarePage />);
		uploadFileStep(getByLabelText, getByRole);
		const upgradeButton = await findByRole('button', { name: /upgrade now/i });
		fireEvent.click(upgradeButton);
		expect(upgradeFirmware).toBeCalled();
	});
});
