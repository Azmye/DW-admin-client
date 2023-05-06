import { createContext, useReducer } from 'react';

export const ModalContext = createContext();

const initalState = {
  isCreateCategory: false,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'CREATE_CATEGORY_OPEN':
      return {
        isCreateCategory: true,
      };
    case 'CLOSE_MODAL':
      return {
        isCreateCategory: false,
      };
    default:
      throw new Error();
  }
};

export const ModalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalState);

  return <ModalContext.Provider value={[state, dispatch]}>{children}</ModalContext.Provider>;
};
