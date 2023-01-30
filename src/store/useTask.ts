import { create } from "zustand";
import { nanoid } from "nanoid";
import React from "react";

interface Result {
  draggableId: string;
  type: string;
  source: {
    index: number;
    droppableId: string;
  };
  reason: string;
  mode: string;
  destination: {
    droppableId: string;
    index: number;
  };
  combine: null;
}

interface Column {
  [path: string]: {
    tasks: { id: string; content: string; complete: boolean }[];
  };
}

const column: Column = {
  todo: {
    tasks: [
      { id: nanoid(), content: "Pick up mail.", complete: false },
      { id: nanoid(), content: "Pick up box.", complete: false },
    ],
  },
  complete: {
    tasks: [
      { id: nanoid(), content: "Feed dog.", complete: true },
      { id: nanoid(), content: "Feed cat.", complete: true },
    ],
  },
};

interface TaskState {
  tasks: Column;
  newTask: (e: React.SyntheticEvent, task: string) => void;
  deleteTask: (id: string, columnId: string) => void;
  setRow: (sourceId: string, result: Result) => void;
  setColumn: (sourceId: string, destId: string, result: Result) => void;
}

const useTaskStore = create<TaskState>()((set, get) => ({
  tasks: column,
  newTask: (e, task) => {
    e.preventDefault();

    const column = get().tasks;

    const newTask = { id: nanoid(), content: task, complete: false };

    const copyTasks = [newTask, ...column["todo"].tasks];

    set((state) => ({
      tasks: {
        ...state.tasks,
        ["todo"]: {
          tasks: copyTasks,
        },
      },
    }));
  },
  deleteTask: (id, columnId) => {
    const column = get().tasks;

    const filtered = column[columnId].tasks.filter((task) => task.id !== id);

    set((state) => ({
      tasks: {
        ...state.tasks,
        [columnId]: {
          tasks: filtered,
        },
      },
    }));
  },
  setRow: (sourceId, result) => {
    const column = get().tasks;

    const { source, destination } = result;

    const sourceItems = [...column[sourceId].tasks];

    const [removed] = sourceItems.splice(source.index, 1);

    sourceItems.splice(destination.index, 0, removed);

    set((state) => ({
      tasks: {
        ...state.tasks,
        [sourceId]: {
          tasks: sourceItems,
        },
      },
    }));
  },
  setColumn: (sourceId, destId, result) => {
    const column = get().tasks;

    const { source, destination } = result;

    const sourceItems = [...column[sourceId].tasks];
    const destItems = [...column[destId].tasks];

    const [removed] = sourceItems.splice(source.index, 1);

    const change = { ...removed, complete: !removed.complete };

    destItems.splice(destination.index, 0, change);

    set((state) => ({
      tasks: {
        ...state.tasks,
        [sourceId]: {
          tasks: sourceItems,
        },
        [destId]: {
          tasks: destItems,
        },
      },
    }));
  },
}));

export default useTaskStore;
