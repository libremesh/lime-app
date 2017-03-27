export const getSid = (state) => state.meta.sid;
export const getMenuIsOpen = (state) => state.meta.menuIsOpen;
export const getUrl = (state) => state.meta.url;
export const getPathname = (state) => state.meta.url.split('?')[0];
export const getId = () => 0;