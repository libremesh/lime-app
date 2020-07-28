const simpleLoader = (param,plugins) => plugins
	.filter(x => x.store)
	.filter(x => typeof x.store[param] !== 'undefined')
	.map(x => x.store[param]);

export const loadReducers = (plugins) => plugins
	.filter(x => x.store)
	.filter(plugin => typeof plugin.store.reducer !== 'undefined')
	.map(x => {
		let y = {};
		y[x.store.name] = x.store.reducer;
		return y;
	})
	.reduce( (a,b) => Object.assign({},a,b),{});

export const loadEpics = (plugins) => plugins
	.filter(x => x.store)
	.filter(plugin => typeof plugin.store.epics !== 'undefined')
	.map(x => x.store.epics)
	.map(data => Object.keys(data).map((key, index) => data[key]).reduce((x,y) => x.concat(y), []))
	.reduce((a,b) => a.concat(b), []);

export const loadSelectors = (plugins) => simpleLoader('selector',plugins);

export const loadConstants = (plugins) => simpleLoader('constants',plugins);

export const loadTranslations = (plugins) => plugins
	.filter(x => typeof x.translations !== 'undefined')
	.map(x => x.translations);
