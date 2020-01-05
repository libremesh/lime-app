const daysBetween = (date1, date2) => {
	//Get 1 day in milliseconds
	let oneDay = 1000 * 60 * 60 * 24; // Convert both dates to milliseconds
	let date1Ms = date1.getTime();
	let date2Ms = date2.getTime(); // Calculate the difference in milliseconds
	let differenceMs = date2Ms - date1Ms; // Convert back to days and return
	return Math.round(differenceMs / oneDay);
};

export default (epocString) => {
    const date = new Date(parseInt(epocString, 10));
	return daysBetween(new Date(), date)
}