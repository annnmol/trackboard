import {
  PlusCircleIcon
} from "lucide-react";

//user defined components
import useAppStore from "@/store";
import { Button } from "@/components/ui/button";
import { KanbanBoard } from "@/components/board/KanbanBoard";
import CreateListForm from "@/components/lists/create-list-form";
import CreateTaskForm from "@/components/tasks/create-task-form";

const HomeScreen = () => {
  // const { getTranscations } = useTransactionService();
  const {
    authSession,
    lists,
    tasks,
  } = useAppStore();

  // useEffect(() => {
  //   if (authSession) {
  //     getTranscations({ id: authSession, limit: 3, skip: 0, date: -1 });
  //   }
  //   return () => {
  //     setTransactions([]);
  //   };
  // }, [authSession]);


  return (
    <>
      <div className="w-full h-full flex flex-col gap-8 p-12 overflow-y-auto">
        <div className="w-full flex justify-between items-center">
          <CreateListForm
            trigger={
              <Button variant="link">
                Add List
              </Button>
            }
          />
           <CreateTaskForm
          trigger={
            <Button
                title="Add Task"
                variant={"secondary"}
            >
              <PlusCircleIcon className="h-4 w-4 mr-1" />
              Task
            </Button>
          }
        />
         
        </div>
        <KanbanBoard listData={lists} taskData={tasks} />
      </div>
    </>
  );
};

export default HomeScreen;
