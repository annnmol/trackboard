import { PlusCircleIcon } from "lucide-react";

//user defined components
import { KanbanBoard } from "@/components/board/KanbanBoard";
import CreateListForm from "@/components/lists/create-list-form";
import CreateTaskForm from "@/components/tasks/create-task-form";
import { Button } from "@/components/ui/button";
import useListService from "@/hooks/useListService";
import useTaskService from "@/hooks/useTaskService";
import useAppStore from "@/store";
import { useEffect } from "react";

const HomeScreen = () => {
  const { getLists, reorderList } = useListService();
  const { authSession, lists, tasks, setTasks, setLists } = useAppStore();
  const { reorderTask } = useTaskService();

  useEffect(() => {
    getLists();
  }, []);

  return (
    <>
      <div className="w-full h-full flex flex-col gap-8 p-12 overflow-y-auto">
        <div className="w-full flex justify-between items-center">
          <CreateListForm trigger={<Button variant="link">Add List</Button>} />
          <CreateTaskForm
            trigger={
              <Button title="Add Task" variant={"secondary"}>
                <PlusCircleIcon className="h-4 w-4 mr-1" />
                Task
              </Button>
            }
          />
        </div>
        {lists.length > 0 ? (
          <KanbanBoard listData={lists} taskData={tasks}
            setLists={setLists}
            setTasks={setTasks}
            reorderList={reorderList}
            reorderTask={reorderTask}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <h1 className="text-2xl">No lists found</h1>{" "}
          </div>
        )}
      </div>
    </>
  );
};

export default HomeScreen;
