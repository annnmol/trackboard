
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

interface IColumn {
  _id: UniqueIdentifier;
  title: string;
  tasks?: UniqueIdentifier[] | ITask[];
  createdBy: UniqueIdentifier;
  position: number;
}
interface ITask {
  _id: UniqueIdentifier;
  columnId: ColumnId;
  title: string;
  description: string;
  dueDate: Date;
  priority: "low" | "medium" | "high";
  createdBy: UniqueIdentifier;
  position: number;
}


interface IColumnDragData {
  type: ColumnType;
  column: Column;
}

type IColumnType = "Column"

type IColumnId = typeof defaultCols[number]["id"];


type ITaskType = "Task";

interface ITaskDragData {
  type: TaskType;
  task: Task;
}

type IDraggableData = IColumnDragData | ITaskDragData;

interface IReorderList{
  id: string;
  position: number;
}
interface IReorderTask{
  id: string;
  position: number;
  columnId: string;
}