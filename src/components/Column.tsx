import { useRef } from "react";
import { useDrop } from "react-dnd";

import { useItemDrag } from "../utils/useItemDrag";

import { useAppState } from "../state/AppStateContext";
import {
  addTask,
  deleteList,
  moveList,
  moveTask,
  setDraggedItem,
} from "../state/actions";

import { ColumnContainer, ColumnHeader, ColumnTitle, Cross } from "./styles";
import { AddNewItem } from "./AddNewItem";
import { Card } from "./Card";
import { isHidden } from "../utils/isHidden";

type ColumnProps = {
  text: string;
  id: string;
  isPreview?: boolean;
};
export const Column = ({ text, id, isPreview }: ColumnProps) => {
  const { getTasksByListId, dispatch, draggedItem } = useAppState();
  const tasks = getTasksByListId(id);
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: ["COLUMN", "CARD"],
    hover() {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type === "COLUMN") {
        if (draggedItem.id === id) {
          return;
        }
        dispatch(moveList(draggedItem.id, id));
      } else {
        if (draggedItem.columnId === id) {
          return;
        }
        if (tasks.length) {
          return;
        }
        dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id));
        dispatch(setDraggedItem({ ...draggedItem, columnId: id }));
      }
    },
  });
  const { drag } = useItemDrag({ type: "COLUMN", id, text });

  drag(drop(ref));

  return (
    <ColumnContainer
      isPreview={isPreview}
      ref={ref}
      isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)}
    >
      <ColumnHeader>
        <ColumnTitle>{text}</ColumnTitle>
        <Cross
          dark={true}
          onClick={() => {
            dispatch(deleteList(id));
          }}
        />
      </ColumnHeader>

      {tasks.map((task) => (
        <Card columnId={id} id={task.id} key={task.id} text={task.text} />
      ))}

      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={(text) => dispatch(addTask(text, id))}
        dark={true}
      />
    </ColumnContainer>
  );
};
