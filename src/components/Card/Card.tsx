import { styled } from "@stitches/react";
import { Draggable } from "react-beautiful-dnd";
import { Icon } from "@iconify/react";
import useTaskStore from "../../store/useTask";

//Typescript
interface Task {
  id: string;
  content: string;
  complete: boolean;
}

//Stiches Style
const StyledCard = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  background: "#F7F0F5",
  border: "1px solid #EEE4E1",
  boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.06), 0px 4px 3px rgba(0, 0, 0, 0.07)",
  borderRadius: "4px",
  padding: "12px",
  marginTop: "5px",
});

const CardStatus = styled("span", {
  width: "16px",
  height: "16px",
  background: "#F7F0F5",
  border: "1px solid #EEE4E1",
  borderRadius: "38px",

  variants: {
    complete: {
      true: {
        border: "none",
        background: "#6366F1",
      },
    },
  },
});

const CardContent = styled("span", {
  fontWeight: "600",
  fontSize: "12px",
  color: "#595959",

  variants: {
    complete: {
      true: {
        color: "#A8A29E",
      },
    },
  },
});

const CardBox = styled("div", {
  display: "flex",
  gap: "16px",
  alignItems: "center",
});

const Button = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "24px",
  height: "24px",
  border: "none",
  cursor: "pointer",
});

export const Card = (props: {
  task: Task;
  columnId: string;
  index: number;
}) => {
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const { task, columnId, index } = props;
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <StyledCard
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <CardBox>
            <CardStatus complete={task.complete} />
            <CardContent complete={task.complete}>{task.content}</CardContent>
          </CardBox>
          <div>
            <Button onClick={() => deleteTask(task.id, columnId)}>
              <Icon
                icon="ic:outline-delete"
                color="#595959"
                width="20"
                height="20"
              />
            </Button>
          </div>
        </StyledCard>
      )}
    </Draggable>
  );
};
