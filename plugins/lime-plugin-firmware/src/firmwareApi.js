export async function upgradeConfirmIsAvailable() {return false;}
export async function uploadFile(formData) {
	return formData;
}
export async function validateFirmware() {return true;}
export async function upgradeFirmware() {return true;}

export default {
	upgradeConfirmIsAvailable,
	uploadFile,
	validateFirmware,
	upgradeFirmware
};
