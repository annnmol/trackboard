import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { Edit2, GripVertical } from "lucide-react";

//user defined
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils";
import CreateTaskForm from "../tasks/create-task-form";

interface TaskCardProps {
  task: ITask;
  isOverlay?: boolean;
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id,
    data: {
      type: "Task",
      task,
    } satisfies ITaskDragData,
    attributes: {
      roleDescription: "Task",
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva("", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
      },
    },
  });

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className="px-3 py-3 space-between flex flex-row border-b-2 border-secondary relative">
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className="p-1 text-secondary-foreground/50 -ml-2 h-auto cursor-grab"
        >
          <span className="sr-only">Move task</span>
          <GripVertical />
          <Badge variant={"outline"} className="ml-auto font-semibold">
          {task.priority?.toUpperCase()}
        </Badge>
        </Button>
        <span className="ml-auto text-gray-600 text-sm">{formatDateTime(task.dueDate).dateOnly}</span>
        <CreateTaskForm
          data={task}
            trigger={
              <Button
              variant="link"
              size="icon"
              className="ml-4 rounded-full h-[20px] w-[20px] bg-transparent text-muted-foreground"
              title="Edit Task"
            >
              <Edit2 className="h-4 w-4 mr-1" />
            </Button>
            }
          />
      </CardHeader>
      <CardContent className="px-3 pt-3 pb-6 text-left whitespace-pre-wrap">
        {task.title}
        <br/>
        <span className="ml-auto text-gray-600 text-sm ">{task.description}</span>
      </CardContent>
    </Card>
  );
}
