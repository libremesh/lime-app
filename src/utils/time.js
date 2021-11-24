export const dateToLocalUnixTimestamp = (date) => {
    // Return unix-timestamp for `date` at 00:00
    // in the current timezone.
    // param: date is like '2021-11-24'
    // return: unix-timestamp 
    const utcDate = new Date(date + 'T00:00:00.000Z');
    const utcTimestamp = utcDate.getTime();
	const utcOffset = utcDate.getTimezoneOffset() * 60 * 1000;
    const localTimestamp = utcTimestamp - utcOffset;
    return parseInt(localTimestamp / 1000);
}
