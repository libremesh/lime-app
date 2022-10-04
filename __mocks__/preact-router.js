export const route = jest.fn();
// getCurrentUrl exec subscribers mocks needed to use Match component
export const getCurrentUrl = jest.fn(() => "some-path");
export const exec = jest.fn(() => false);
export const subscribers = [];
