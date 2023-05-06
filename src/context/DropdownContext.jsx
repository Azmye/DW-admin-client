import { createContext, useReducer } from 'react';

export const DropdownContext = createContext();

const initalState = {
  isProfileDropdown: false,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'PROFILE_DROPDOWN_OPEN':
      return {
        isProfileDropdown: true,
      };
    case 'PROFILE_DROPDOWN_CLOSE':
      return {
        isProfileDropdown: false,
      };
    default:
      throw new Error();
  }
};

export const DropdownContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalState);

  return <DropdownContext.Provider value={[state, dispatch]}>{children}</DropdownContext.Provider>;
};
