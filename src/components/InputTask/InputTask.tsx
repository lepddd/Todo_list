import React from "react";
import { useState } from "react";
import { styled } from "@stitches/react";
import { Icon } from "@iconify/react";  
import useTaskStore from "../../store/useTask";

//Stiches Style
const InputForm = styled("form", {
  background: "#EEE4E1",
  borderRadius: "35px",
  alignItems: "center",
  display: "flex",
  padding: "6px 6px 6px 8px",
  gap: "6px",
  width: "100%",
  position: "relative",
});

const Input = styled("input", {
  padding: "4px",
  background: "#EEE4E1",
  color: "#595959",
  fontWeight: "600",
  fontSize: "12px",
  flexGrow: "1",
  border: "1px solid #eee4e1",
  outline: "none",
});

const Button = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "24px",
  height: "24px",
  border: "none",
  cursor: "pointer",
  background: "#595959",
  borderRadius: "50%",
});

export const InputTask = () => {
  const [task, setTask] = useState("");

  const newTask = useTaskStore((state) => state.newTask);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTask(e.target.value);
  }

  function addTask(e: React.MouseEvent<HTMLElement>) {
    newTask(e, task);
    setTask("");
  }

  return (
    <InputForm>
      <Input
        onChange={(e) => handleChange(e)}
        value={task}
        placeholder="Task..."
      />
      <Button onClick={(e) => addTask(e)}>
        <Icon icon="ic:baseline-plus" color="#f7f0f5" width="20" height="20" />
      </Button>
    </InputForm>
  );
};
