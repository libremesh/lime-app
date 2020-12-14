const t = jest.fn((x, data={}) => {
	Object.entries(data).forEach(
		([key, value]) => x = x.replace(new RegExp(String.raw`%{${key}}`), value)
	)
	return x;
});

export default {t};
