const simpleLoader = (param,plugins) => {
  return plugins
    .filter(x => typeof x.store[param] !== 'undefined')
    .map(x => x.store[param]);
};

export const loadReducers = (plugins) => {
  return plugins
    .filter(plugin => typeof plugin.store.reducer !== 'undefined')
    .map(x => {
      let y = {};
      y[x.store.name] = x.store.reducer;
      return y;
    })
    .reduce( (a,b) => Object.assign({},a,b),{});
};

export const loadEpics = (plugins) => {
  return plugins
    .filter(plugin => typeof plugin.store.epics !== 'undefined')
    .map(x => x.store.epics)
    .map(data => Object.keys(data).map((key, index)=>data[key]).reduce((x,y) => x.concat(y), []))
    .reduce((a,b)=> a.concat(b), []);
};

export const loadSelectors = (plugins) => {
  return simpleLoader('selector',plugins);
};

export const loadConstants = (plugins) => {
  return simpleLoader('constants',plugins);
};