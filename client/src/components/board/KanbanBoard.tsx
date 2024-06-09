/* eslint-disable no-debugger */
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import {
  Announcements,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";

//user defined
import { BoardColumn, BoardContainer } from "./BoardColumn";
import { TaskCard } from "./TaskCard";
import { hasDraggableData } from "./utils";
import useListService from "@/hooks/useListService";
import useTaskService from "@/hooks/useTaskService";
import { set } from "date-fns";
import useAppStore from "@/store";

interface Props {
  listData: IList[];
  taskData: ITask[];
  setLists: any;
  setTasks: any;
  reorderList: any;
  reorderTask:any
}

export function KanbanBoard({ listData:columns, taskData:tasks, reorderList,reorderTask,setLists:setColumns,setTasks }: Props) {
  // const { reorderList } = useListService();
  // const { reorderTask } = useTaskService();
  // const {setLists:setColumns,setTasks} = useAppStore();
  // const [columns, setColumns] = useState<IList[]>(listData);
  const pickedUpTaskColumn = useRef<IListId | null>(null);
  const columnsId = useMemo(() => columns?.map((col) => col._id), [columns]);

  // const [tasks, setTasks] = useState<ITask[]>(taskData);

  const [activeColumn, setActiveColumn] = useState<IList | null>(null);

  const [activeTask, setActiveTask] = useState<ITask | null>(null);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  function getDraggingTaskData(taskId: UniqueIdentifier, listId: IListId) {
    const tasksInColumn = tasks.filter((task) => task.listId === listId);
    const taskPosition = tasksInColumn.findIndex((task) => task._id === taskId);
    const column = columns.find((col) => col._id === listId);
    return {
      tasksInColumn,
      taskPosition,
      column,
    };
  }

  const announcements: Announcements = {
    onDragStart({ active }) {
      if (!hasDraggableData(active)) return;
      if (active.data.current?.type === "Column") {
        const startlistIdx = columnsId.findIndex((id) => id === active.id);
        const startColumn = columns[startlistIdx];
        return `Picked up Column ${startColumn?.title} at position: ${
          startlistIdx + 1
        } of ${columnsId.length}`;
      } else if (active.data.current?.type === "Task") {
        pickedUpTaskColumn.current = active.data.current.task.listId;
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          active.id,
          pickedUpTaskColumn.current
        );
        return `Picked up Task ${active.data.current.task.title} at position: ${
          taskPosition + 1
        } of ${tasksInColumn.length} in column ${column?.title}`;
      }
    },
    onDragOver({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) return;
      if (
        active.data.current?.type === "Column" &&
        over.data.current?.type === "Column"
      ) {
        const overlistIdx = columnsId.findIndex((id) => id === over.id);
        return `Column ${active.data.current.list?.title} was moved over ${
          over.data.current.list?.title
        } at position ${overlistIdx + 1} of ${columnsId.length}`;
      } else if (
        active.data.current?.type === "Task" &&
        over.data.current?.type === "Task"
      ) {
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          over.id,
          over.data.current.task.listId
        );
        if (over.data.current.task.listId !== pickedUpTaskColumn.current) {
          return `Task ${
            active.data.current.task.title
          } was moved over column ${column?.title} in position ${
            taskPosition + 1
          } of ${tasksInColumn.length}`;
        }
        return `Task was moved over position ${taskPosition + 1} of ${
          tasksInColumn.length
        } in column ${column?.title}`;
      }
    },
    onDragEnd({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) {
        pickedUpTaskColumn.current = null;
        return;
      }
      if (
        active.data.current?.type === "Column" &&
        over.data.current?.type === "Column"
      ) {
        const overColumnPosition = columnsId.findIndex((id) => id === over.id);
        console.log(
          `Column ${active.data.current.list.title} was dropped into position ${
            overColumnPosition + 1
          } of ${columnsId.length}`
        );
        return `Column ${
          active.data.current.list.title
        } was dropped into position ${overColumnPosition + 1} of ${
          columnsId.length
        }`;
      } else if (
        active.data.current?.type === "Task" &&
        over.data.current?.type === "Task"
      ) {
        console.log(
          "over.data.current",
          over.data.current,
          active.data.current
        );
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          over.id,
          over.data.current.task.listId
        );
        if (over.data.current.task.listId !== pickedUpTaskColumn.current) {
          console.log(
            `Task was dropped into column ${column?.title} in position ${
              taskPosition + 1
            } of ${tasksInColumn.length}`
          );
          return `Task was dropped into column ${column?.title} in position ${
            taskPosition + 1
          } of ${tasksInColumn.length}`;
        }

        console.log(
          `Task was dropped into position ${taskPosition + 1} of ${
            tasksInColumn.length
          } in column ${column?.title}`
        );
        return `Task was dropped into position ${taskPosition + 1} of ${
          tasksInColumn.length
        } in column ${column?.title}`;
      }
      pickedUpTaskColumn.current = null;
    },
    onDragCancel({ active }) {
      pickedUpTaskColumn.current = null;
      if (!hasDraggableData(active)) return;
      return `Dragging ${active.data.current?.type} cancelled.`;
    },
  };

  function onDragStart(event: DragStartEvent) {
    if (!hasDraggableData(event.active)) return;
    const data = event.active.data.current;
    if (data?.type === "Column") {
      setActiveColumn(data.column);
      return;
    }

    if (data?.type === "Task") {
      setActiveTask(data.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (!hasDraggableData(active)) return;

    const activeData = active.data.current;

    if (activeId === overId) return;

    const isActiveAColumn = activeData?.type === "Column";
    if (!isActiveAColumn) return;

    const activeColumnIndex = columns.findIndex((col) => col._id === activeId);
    const overColumnIndex = columns.findIndex((col) => col._id === overId);
    const result = arrayMove(columns, activeColumnIndex, overColumnIndex);
    const payload = result?.map((col, index) => {
      return { _id: col._id, position: index };
    });
    setColumns(result);
    reorderList(payload);
    // setColumns((columns) => {
    //   const activeColumnIndex = columns.findIndex((col) => col._id === activeId);

    //   const overColumnIndex = columns.findIndex((col) => col._id === overId);

    //   const result = arrayMove(columns, activeColumnIndex, overColumnIndex);
    //   const payload = result?.map((col, index) => {return {_id:col._id, position:index}})
    //   console.log("result", result)
    //   reorderList(payload);
    //   return result;
    // });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    const isActiveATask = activeData?.type === "Task";
    const isOverATask = overData?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      let result: any = [];
      const activeIndex = tasks.findIndex((t) => t._id === activeId);
      const overIndex = tasks.findIndex((t) => t._id === overId);
      const activeTask = tasks[activeIndex];
      const overTask = tasks[overIndex];
      if (activeTask && overTask && activeTask.listId !== overTask.listId) {
        activeTask.listId = overTask.listId;
        result = arrayMove(tasks, activeIndex, overIndex - 1);
      } else {
        result = arrayMove(tasks, activeIndex, overIndex);
      }
      setTasks(result);
      const payload = result?.map((t, index) => {
        return { _id: t._id, listId: t.listId, position: index };
      });
      reorderTask(payload);
      return;
      // setTasks((tasks) => {
      //   const activeIndex = tasks.findIndex((t) => t._id === activeId);
      //   const overIndex = tasks.findIndex((t) => t._id === overId);
      //   const activeTask = tasks[activeIndex];
      //   const overTask = tasks[overIndex];
      //   if (
      //     activeTask &&
      //     overTask &&
      //     activeTask.listId !== overTask.listId
      //   ) {
      //     activeTask.listId = overTask.listId;
      //     return arrayMove(tasks, activeIndex, overIndex - 1);
      //   }

      //   return arrayMove(tasks, activeIndex, overIndex);
      // });
      // reorderTask()
    }

    const isOverAColumn = overData?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      let result: any = [];
      const activeIndex = tasks.findIndex((t) => t._id === activeId);
      const activeTask = tasks[activeIndex];
      if (activeTask) {
        activeTask.listId = overId as IListId;
        result = arrayMove(tasks, activeIndex, activeIndex);
      }
      else {
        result= tasks;
      }
      setTasks(result);
      const payload = result?.map((t, index) => {
        return { _id: t._id, listId: t.listId, position: index };
      });
      reorderTask(payload);
      // setTasks((tasks) => {
      //   const activeIndex = tasks.findIndex((t) => t._id === activeId);
      //   const activeTask = tasks[activeIndex];
      //   if (activeTask) {
      //     activeTask.listId = overId as IListId;
      //     return arrayMove(tasks, activeIndex, activeIndex);
      //   }
      //   return tasks;
      // });
      // reorderTask
    }
  }

  // useEffect(() => {
  //   setColumns(listData);
  // }, [listData]);

  // useEffect(() => {
  //   setTasks(taskData);
  // }, [taskData]);

  return (
    <DndContext
      accessibility={{
        announcements,
      }}
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <BoardContainer>
        <SortableContext items={columnsId}>
          {columns.map((col) => (
            <BoardColumn
              key={col._id}
              list={col}
              tasks={tasks.filter((task) => task.listId === col._id)}
            />
          ))}
        </SortableContext>
      </BoardContainer>

      {"document" in window &&
        createPortal(
          <DragOverlay>
            {activeColumn && (
              <BoardColumn
                isOverlay
                list={activeColumn}
                tasks={tasks.filter((task) => task.listId === activeColumn._id)}
              />
            )}
            {activeTask && <TaskCard task={activeTask} isOverlay />}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );
}
