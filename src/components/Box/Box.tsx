import { DragDropContext } from "react-beautiful-dnd";
import { styled } from "@stitches/react";
import { Column } from "../Column/Column";
import useTaskStore from "../../store/useTask";

//Stiches Style
const StyledBox = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  height: "19.5rem",
  position: "relative",
  width: "100%",
});

export const Box = () => {
  const tasks = useTaskStore((state) => state.tasks);

  const setColumn = useTaskStore((state) => state.setColumn);
  const setRow = useTaskStore((state) => state.setRow);

  function onDragEnd(result: any) {
    if (!result.destination) return;

    const { source, destination } = result;

    const sourceId = source.droppableId;
    const destinationId = destination.droppableId;

    if (sourceId !== destinationId) {
      setColumn(sourceId, destinationId, result);
    } else {
      setRow(sourceId, result);
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StyledBox>
        {Object.entries(tasks).map(([columnId, column]) => (
          <Column column={column} columnId={columnId} key={columnId} />
        ))}
      </StyledBox>
    </DragDropContext>
  );
};
