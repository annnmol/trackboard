export const TRANSACTION_TYPE_OPTIONS = [
  {
    label: "CREDIT",
    id: "CREDIT",
  },
  {
    label: "DEBIT",
    id: "DEBIT",
  },
];

export const SORT_BY_OPTIONS = [
  {
    label: "Date:  Asc ↑",
    id: 1,
  },
  {
    label: "Date:  Desc ↓",
    id:2,
  },
  {
    label: "Amount:  Asc ↑",
    id: 3,
  },
  {
    label: "Amount:  Desc ↓",
    id: 4,
  },
];

export const PRIORITY_TYPE_OPTIONS = [
  {
    label: "Low",
    id: "low",
  },
  {
    label: "Medium",
    id: "medium",
  },
  {
    label: "High",
    id: "high",
  },
];

export const defaultCols:IList[] = [
  {
    _id: "todo" as const,
    title: "Todo",
    createdBy: "user1",
    position: 0
  },
  {
    _id: "in-progress" as const,
    title: "In progress",
    createdBy: "user2",
    position: 1
  },
  {
    _id: "done" as const,
    title: "Done",
    createdBy: "user3",
    position: 2
  },
];

export const initialTasks: ITask[] = [
  {
    _id: "task1",
    listId: "done",
    title: "Project initiation and planning",
    description: "Description for task1",
    dueDate: new Date(),
    priority: "low",
    createdBy: "user1",
    position: 0
  },
  {
    _id: "task2",
    listId: "done",
    title: "Gather requirements from stakeholders",
    description: "Description for task2",
    dueDate: new Date(),
    priority: "medium",
    createdBy: "user2",
    position: 2
  },
  {
    _id: "task3",
    listId: "done",
    title: "Create wireframes and mockups",
    description: "Description for task3",
    dueDate: new Date(),
    priority: "high",
    createdBy: "user3",
    position: 1
  },
  {
    _id: "task4",
    listId: "in-progress",
    title: "Develop homepage layout",
    description: "Description for task4 as asdha asdjsd asdand asdjas asdjas asjsa asdsdas ddadsvdfd Description for task3Description for task3Description for task3Description for task3Description for task3Description for task3 Description for task3 Description for task3",
    dueDate: new Date(),
    priority: "low",
    createdBy: "user4",
    position: 0
  },
  {
    _id: "task5",
    listId: "in-progress",
    title: "Design color scheme and typography",
    description: "Description for task5",
    dueDate: new Date(),
    priority: "medium",
    createdBy: "user5",
    position: 1
  },
  {
    _id: "task6",
    listId: "todo",
    title: "Implement user authentication",
    description: "Description for task6",
    dueDate: new Date(),
    priority: "high",
    createdBy: "user6",
    position: 0
  },
  {
    _id: "task7",
    listId: "todo",
    title: "Build contact us page",
    description: "Description for task7",
    dueDate: new Date(),
    priority: "low",
    createdBy: "user7",
    position: 1
  },
  {
    _id: "task8",
    listId: "todo",
    title: "Create product catalog",
    description: "Description for task8",
    dueDate: new Date(),
    priority: "medium",
    createdBy: "user8",
    position: 2
  },
  {
    _id: "task9",
    listId: "todo",
    title: "Develop about us page",
    description: "Description for task9",
    dueDate: new Date(),
    priority: "high",
    createdBy: "user9",
    position: 3
  },
  {
    _id: "task10",
    listId: "todo",
    title: "Optimize website for mobile devices",
    description: "Description for task10",
    dueDate: new Date(),
    priority: "low",
    createdBy: "user10",
    position: 4
  },
  {
    _id: "task11",
    listId: "todo",
    title: "Integrate payment gateway",
    description: "Description for task11",
    dueDate: new Date(),
    priority: "medium",
    createdBy: "user11",
    position: 5
  },
  {
    _id: "task12",
    listId: "todo",
    title: "Perform testing and bug fixing",
    description: "Description for task12",
    dueDate: new Date(),
    priority: "high",
    createdBy: "user12",
    position: 6
  },
  {
    _id: "task13",
    listId: "todo",
    title: "Launch website and deploy to server",
    description: "Description for task13",
    dueDate: new Date(),
    priority: "low",
    createdBy: "user13",
    position: 7
  },
];