
interface IData {
  [key: string]: any;
}

interface IWallet { 
  _id: string
  name: string
  balance: number
  date: string
}


interface ITransaction { 
  _id: string
  walletId: string
  amount: number
  balance: number
  description: string
  type: "CREDIT" | "DEBIT"
  date: date
}
interface IAuthSession { 
  _id: string
  email: string
  fullName: number
  profilePic: number
}

type UniqueIdentifier = string | number;

interface IList {
  _id: UniqueIdentifier;
  title: string;
  tasks?: UniqueIdentifier[] | ITask[];
  createdBy: UniqueIdentifier;
  position: number;
}
interface ITask {
  _id: UniqueIdentifier;
  listId: listId;
  title: string;
  description: string;
  dueDate: Date;
  priority: "low" | "medium" | "high";
  createdBy: UniqueIdentifier;
  position: number;
}


interface IListDragData {
  type: ListType;
  list: List;
}

type IListType = "List"

type IListId = typeof defaultCols[number]["id"];


type ITaskType = "Task";

interface ITaskDragData {
  type: TaskType;
  task: Task;
}

type IDraggableData = IListDragData | ITaskDragData;

interface IReorderList{
  id: string;
  position: number;
}
interface IReorderTask{
  id: string;
  position: number;
  listId: string;
}