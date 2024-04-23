import { AddNewItem } from "./components/AddNewItem";
import { Column } from "./components/Column";
import { CustomDragLayer } from "./components/CustomDragLayer";
import { addList } from "./state/actions";
import { useAppState } from "./state/AppStateContext";
import { AppContainer } from "./components/styles";

function App() {
  const { lists, dispatch } = useAppState();

  return (
    <>
      <AppContainer>
        <CustomDragLayer />
        {lists.map((list) => (
          <Column key={list.id} id={list.id} text={list.text} />
        ))}
        <AddNewItem
          toggleButtonText="+ Create new list"
          onAdd={(text) => dispatch(addList(text))}
        />
      </AppContainer>
    </>
  );
}

export default App;
