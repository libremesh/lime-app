export const dateToLocalUnixTimestamp = (date, time) => {
    // Return unix-timestamp for `date` at 00:00
    // in the current timezone.
    // param date: is like '2021-11-24'
    // param time: is like '23:59'
    // return: unix-timestamp
    const utcDate = new Date(`${date  }T${time}:00.000Z`);
    const utcTimestamp = utcDate.getTime();
	const utcOffset = utcDate.getTimezoneOffset() * 60 * 1000;
    const localTimestamp = utcTimestamp + utcOffset;
    return Math.floor(localTimestamp / 1000);
}
