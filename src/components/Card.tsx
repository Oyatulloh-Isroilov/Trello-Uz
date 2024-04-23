import { useRef } from "react";
import { useDrop } from "react-dnd";
import { deleteTask, moveTask, setDraggedItem } from "../state/actions";
import { useAppState } from "../state/AppStateContext";
import { CardContainer, CardText, Cross } from "./styles";
import { isHidden } from "../utils/isHidden";
import { useItemDrag } from "../utils/useItemDrag";

type CardProps = {
  text: string;
  id: string;
  columnId: string;
  isPreview?: boolean;
};

export const Card = ({ text, id, isPreview, columnId }: CardProps) => {
  const { draggedItem, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({
    type: "CARD",
    id,
    text,
    columnId,
  });
  const [, drop] = useDrop({
    accept: "CARD",
    hover() {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type !== "CARD") {
        return;
      }
      if (draggedItem.id === id) {
        return;
      }
      dispatch(moveTask(draggedItem.id, id, draggedItem.columnId, columnId));
      dispatch(setDraggedItem({ ...draggedItem, columnId }));
    },
  });
  drag(drop(ref));
  const handleDelete = () => {
    dispatch(deleteTask(id, columnId));
  };

  return (
    <CardContainer
      ref={ref}
      isHidden={isHidden(draggedItem, "CARD", id, isPreview)}
      isPreview={isPreview}
    >
      <CardText>{text}</CardText>
      <Cross dark={true} onClick={handleDelete} />
    </CardContainer>
  );
};
