import { createContext, type ReactNode, useReducer, type Dispatch } from "react";

interface CustomContextProviderProps {
  children: ReactNode;
};

interface ContextAction {
  type: 'ADD_FAVORITE' | 'REMOVE_FAVORITE';
  payload: any;
};

interface AppContext {
  state: Array<number>;
  dispatch: Dispatch<ContextAction>;
  isLoading: boolean;
};

export const AppContext = createContext<AppContext>({
  state: [],
  dispatch: (contextAction: ContextAction) => { },
  isLoading: false
});

function contextReducer(state: Array<number>, action: ContextAction) {
  switch (action.type) {
    case 'ADD_FAVORITE': {
      return [...state, action.payload];
    }
    case 'REMOVE_FAVORITE': {
      const index = state.findIndex((id) => id === action.payload);
      if (index != -1) {
        const stateCopy = [...state];
        stateCopy.splice(index, 1);
        return stateCopy;
      }

      throw new Error(`Movie id not found: ${action.payload}`);
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function CustomContextProvider(props: CustomContextProviderProps) {
  const [state, dispatch] = useReducer(contextReducer, []);
  const value = { state, dispatch, isLoading: false };
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export { CustomContextProvider };