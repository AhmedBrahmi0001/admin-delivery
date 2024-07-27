// auth.js
import { REGISTER, LOGIN, LOGOUT, FAKE_LOGIN } from './actions';

// Initial state
export const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

// Auth reducer
const auth = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER: {
      const { user } = action.payload;
      return {
        ...state,
        user
      };
    }
    case LOGIN: {
      const { user } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        isInitialized: true,
        user
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: false,
        user: null
      };
    }
    case FAKE_LOGIN: {
      // Handling fake login
      const { user } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        isInitialized: true,
        user
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default auth;
