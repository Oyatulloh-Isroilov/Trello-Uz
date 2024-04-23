import styled from "styled-components";

interface DragPreviewContainerProps {
  isHidden?: boolean;
  isPreview?: boolean;
}

type AddItemButtonProps = {
  dark?: boolean;
};
type CrossProps = {
  dark?: boolean;
};

export const DragPreviewContainer = styled.div<DragPreviewContainerProps>`
  opacity: ${(props) => (props.isHidden ? 0 : 1)};
  transform: ${(props) => (props.isPreview ? "rotate(5deg)" : undefined)};
`;
export const Cross = styled.div<CrossProps>`
  width: 20px;
  height: 20px;
  opacity: 0.3;
  position: relative;
  &:hover {
    opacity: 1;
  }
  &:before,
  &:after {
    position: absolute;
    left: 15px;
    content: " ";
    height: 20px;
    width: 2px;
    background-color: ${(props) => (props.dark ? "#000" : "#fff")};
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
  margin-right: 5px;
  cursor: pointer;
`;


export const AppContainer = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  height: 100vh;
  align-items: flex-start;
  background-color: #7DCD85;
  flex-direction: row;
  padding: 20px;
`;

export const ColumnContainer = styled(DragPreviewContainer)`
  background-color: #ebecf0;
  width: 300px;
  min-height: 40px;
  margin-right: 20px;
  border-radius: 3px;
  padding: 8px 8px;
  flex-grow: 0;
  flex-shrink: 0;
  & > ${Cross} {
    opacity: 0;
    transition: opacity 85ms ease-in;
  }
  &:hover {
    & > ${Cross} {
      opacity: 1;
    }
  }
`;

export const ColumnHeader = styled.div`
  padding: 6px 16px 12px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`;
export const ColumnTitle = styled.div`
  font-weight: bold;
`;

export const CardContainer = styled(DragPreviewContainer)`
  display: flex;
  justify-content: space-between;
  color: #7DCD85;
  background-color: #fff;
  cursor: pointer;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  max-width: 300px;
  border-radius: 3px;
  box-shadow: #091e4240 0px 1px 0px 0px;
  ${Cross} {
    opacity: 0;
    transition: opacity 85ms ease-in;
  }
  &:hover {
    ${Cross} {
      opacity: 1;
    }
  }
`;

export const CardText = styled.div``;

export const AddItemButton = styled.button<AddItemButtonProps>`
  background-color: #ffffff3d;
  border-radius: 3px;
  border: none;
  color: ${(props) => (props.dark ? "#000" : "#fff")};
  cursor: pointer !important;
  width: 300px;
  min-width: 200px;
  padding: 10px 12px;
  text-align: left;
  transition: background 85ms ease-in;
  width: 100%;
  &:hover {
    background-color: #ffffff52;
  }
`;

export const NewItemFormContainer = styled.form`
  width: 600px;
  display: flex;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const NewItemButton = styled.button`
  background-color: #5aac44;
  border-radius: 3px;
  border: none;
  box-shadow: none;
  color: #fff;
  padding: 6px 12px;
  text-align: center;
  cursor: pointer;
`;

export const NewItemInput = styled.input`
  border-radius: 3px;
  border: none;
  box-shadow: #091e4240 0px 1px 0px 0px;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  width: 100%;
`;

export const CustomDragLayerContainer = styled.div`
  height: 100%;
  left: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`;

type DragPreviewWrapperProps = {
  position: {
    x: number;
    y: number;
  };
};

export const DragPreviewWrapper = styled.div.attrs<DragPreviewWrapperProps>(
  ({ position: { x, y } }) => ({
    style: {
      transform: `translate(${x}px, ${y}px)`,
    },
  })
)<DragPreviewWrapperProps>``;
