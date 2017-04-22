
export const getTasks = (api, sid) => {
  return api.call(sid, 'get_notes', { });
};

export const setTasks = (api, sid, tasks) => {
  return api.call(sid, 'set_notes', tasks);
};