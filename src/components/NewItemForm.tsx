import { useState } from "react";
import {
  NewItemFormContainer,
  NewItemButton,
  NewItemInput,
  Cross,
} from "./styles";
import { useFocus } from "../utils/useFocus";

type NewItemFormProps = {
  onAdd(text: string): void;
  onClose(): void;
  dark?: boolean;
};

export const NewItemForm = ({ onAdd, onClose, dark }: NewItemFormProps) => {
  const [text, setText] = useState("");
  const inputRef = useFocus();

  return (
    <NewItemFormContainer
      onSubmit={(e) => {
        e.preventDefault();
        onAdd(text);
      }}
    >
      <NewItemInput
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <NewItemButton type="submit">Create</NewItemButton>
      <Cross dark={dark} onClick={onClose} />
    </NewItemFormContainer>
  );
};
