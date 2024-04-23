import { createContext, useContext, Dispatch, useEffect } from "react";
import { appStateReducer, AppState, List, Task } from "./appStateReducer";
import { Action } from "./actions";
import { useImmerReducer } from "use-immer";
import { DragItem } from "../components/DragItem";
import { withInitialState } from "../components/withInitialState";

type AppStateProviderProps = {
  children: React.ReactNode;
  initialState: AppState;
};
type AppStateContextProps = {
  lists: List[];
  getTasksByListId(id: string): Task[];
  dispatch: Dispatch<Action>;
  draggedItem: DragItem | null;
};
const AppStateContext = createContext({} as AppStateContextProps);

export const AppStateProvider = withInitialState<AppStateProviderProps>(
  ({ children, initialState }) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, initialState);

    useEffect(
      () => localStorage.setItem("trello", JSON.stringify(state)),
      [state]
    );
    const { draggedItem, lists } = state;

    const getTasksByListId = (id: string) =>
      lists.find((list) => list.id === id)?.tasks || [];
    return (
      <AppStateContext.Provider
        value={{ draggedItem, lists, getTasksByListId, dispatch }}
      >
        {children}
      </AppStateContext.Provider>
    );
  }
);

export const useAppState = () => useContext(AppStateContext);
