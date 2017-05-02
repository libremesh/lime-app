
export const getTasks = (api, sid) => {
  return api.call(sid, 'get_notes', { })
    .map(x => {
      if (typeof x.notes === 'undefined') {
        throw {error:true};
      }
      return x;
    });
};

export const setTasks = (api, sid, tasks) => {
  return api.call(sid, 'set_notes', tasks);
};