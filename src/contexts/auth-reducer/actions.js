// actions.js
export const LOGIN = '@auth/LOGIN';
export const LOGOUT = '@auth/LOGOUT';
export const REGISTER = '@auth/REGISTER';
export const FAKE_LOGIN = '@auth/FAKE_LOGIN'; // New action for fake login

// Action creator for fake login
export const fakeLogin = (user) => ({
  type: FAKE_LOGIN,
  payload: { user }
});
