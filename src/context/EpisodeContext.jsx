import { createContext, useReducer } from 'react';

export const EpisodeContext = createContext();

const initalState = {
  isCreateEps: false,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'CREATE_EPS_OPEN':
      return {
        isCreateEps: true,
      };
    case 'CLOSE_MODAL':
      return {
        isCreateEps: false,
      };
    default:
      throw new Error();
  }
};

export const EpisodeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalState);

  return <EpisodeContext.Provider value={[state, dispatch]}>{children}</EpisodeContext.Provider>;
};
