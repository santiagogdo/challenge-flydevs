import { createContext, type ReactNode, useReducer, type Dispatch } from "react";
import type { Movie } from "../../interfaces";

interface CustomContextProviderProps {
  children: ReactNode;
};

interface ContextAction {
  type: 'ADD_FAVOURITE' | 'REMOVE_FAVOURITE';
  payload: any;
};

interface AppContext {
  state: Array<Movie>;
  dispatch: Dispatch<ContextAction>;
  isLoading: boolean;
};

export const AppContext = createContext<AppContext>({
  state: [],
  dispatch: (contextAction: ContextAction) => { },
  isLoading: false
});

function contextReducer(state: Array<Movie>, action: ContextAction) {
  switch (action.type) {
    case 'ADD_FAVOURITE': {
      return [...state, action.payload];
    }
    case 'REMOVE_FAVOURITE': {
      const index = state.findIndex((movie) => movie.id === action.payload);
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