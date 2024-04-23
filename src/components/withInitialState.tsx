import { useEffect, useState } from "react";
import { AppState } from "../state/appStateReducer";

type InjectedProps = {
  initialState: AppState;
};

type PropsWithoutInjected<TBaseProps> = Omit<TBaseProps, keyof InjectedProps>;

export function withInitialState<TProps>(
  WrappedComponent: React.ComponentType<
    PropsWithoutInjected<TProps> & InjectedProps
  >
) {
  return (props: PropsWithoutInjected<TProps>) => {
    const [isLoading, setIsLoading] = useState(true);
    const [initialState, setInitialState] = useState({
      lists: [],
      draggedItem: null,
    });

    useEffect(() => {
      const data = localStorage.getItem("trello");
      if (!data) {
        localStorage.setItem("trello", JSON.stringify(initialState));
        setIsLoading(false);
        return;
      }
      setInitialState(JSON.parse(data));
      setIsLoading(false);
    }, []);
    if (isLoading) {
      return null;
    }
    return <WrappedComponent {...props} initialState={initialState} />;
  };
}
