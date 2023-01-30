import { styled } from "@stitches/react";
import { Droppable } from "react-beautiful-dnd";
import { Card } from "../Card/Card";

//Typescript
interface Column {
  tasks: { id: string; content: string; complete: boolean }[];
}

interface Task {
  id: string;
  content: string;
  complete: boolean;
}

//Stiches Style
const StyledColumn = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  height: "50%",
  width: "100%",
});

const ColumnTitle = styled("p", {
  fontWeight: "600",
  fontSize: "10px",
  color: "#595959",
});

const Dropbox = styled("div", {
  height: "calc(100% - 12px)",
  width: "100%",
  paddingBottom: "5px",
  boxSizing: "border-box",
  overflowY: "auto",
  overflowX: "clip",

  "&::-webkit-scrollbar": {
    width: "5px",
    borderRadius: "50%",
  },

  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },

  "&::-webkit-scrollbar-thumb": {
    background: "#EEE4E1",
    borderRadius: "99px",
  },

  "&::-webkit-scrollbar-thumb:hover": {
    background: "#E1D0CB",
  },
});

export const Column = (props: { columnId: string; column: Column }) => {
  const { columnId, column } = props;

  return (
    <StyledColumn>
      <ColumnTitle>{columnId.toUpperCase()}</ColumnTitle>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <Dropbox {...provided.droppableProps} ref={provided.innerRef}>
            {column.tasks.map((task: Task, index: number) => (
              <Card
                task={task}
                index={index}
                columnId={columnId}
                key={task.id}
              />
            ))}
            {provided.placeholder}
          </Dropbox>
        )}
      </Droppable>
    </StyledColumn>
  );
};
/*  */
