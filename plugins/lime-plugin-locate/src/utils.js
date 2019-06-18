
export const isObject = (obj) => typeof obj === 'object' && obj !== null;

export const sameLocation = (coord1, coord2) => Number(coord1.lon) === Number(coord2.lon) && Number(coord1.lat) === Number(coord2.lat);

export const sameTuple = (t1, t2) => {
	if (t1.length !== t2.length) return false;
	let i = 0;
	for (i in t1) {
		if (t1[i] !== t2[i]) return false;
	}
	return true;
};

export const tupleInList = (tuple, list) => list && list.reduce((ret, el) => ret || sameTuple(el, tuple), false);

export const removeDuplicates = (collection, getIdentifier) => {
	const identifierState = {};
	return collection.filter((value) => {
		const identifier = String(getIdentifier(value));
		if (identifierState[identifier]) {
			return false;
		}
		identifierState[identifier] = true;
		return true;
	});
};

export const coordsToPoint = ({ coordinates, hostname }) => ({ type: 'Feature', geometry: { type: 'Point', coordinates: [Number(coordinates.lon), Number(coordinates.lat)] },  properties: { name: hostname } });

export const coordspairToLineString = (coordinates) => ({ type: 'Feature', geometry: { type: 'LineString', coordinates } });
