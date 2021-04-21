export function sortBySignal(assoclist, threshold=3) {

	/** Sort assoclist by signal but alphabetically when signal differs
	 * for less than threshold to avoid jumpy ordering when refetching.
	 * */
	if (assoclist.length === 0) {
		return assoclist
	}
	const bySignal = [...assoclist];
	bySignal.sort((a, b) => (a.signal > b.signal) ? -1 : 1);
	let lastSignal = bySignal[0].signal;
	let currentIndex = 0;
	for (let i = 0; i < bySignal.length; i++) {
		const station = bySignal[i];
		if ((lastSignal - station.signal) > threshold) {
			currentIndex += 1;
			lastSignal = station.signal;
		}
		station.sortIndex = currentIndex;
	}
	return bySignal.sort((a, b) =>
		((a.sortIndex < b.sortIndex) ||
		 (a.sortIndex === b.sortIndex) && a.mac < b.mac
		) ? -1 : 1);
}

export function markAssociated(assoclist) {
	const result = [...assoclist];
	result.forEach(sta => {
		sta.associated = sta.inactive < 2000;
	});
	return [
		...result.filter(sta => sta.associated),
		...result.filter(sta => !sta.associated)
	];
}

export function ifaceToRadioNumber(iface) {
	const match = iface.match(/\D*(\d+)\D*/);
	if (match.length === 2) {
		return match[1];
	}
	return iface;
}
