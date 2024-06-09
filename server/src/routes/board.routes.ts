import express from "express";

//user defined
import { createList, deleteList, getLists, reorderList, updateList } from "../controllers/list.controller";
import { createTask, deleteTask, getTasks, reorderTask, updateTask } from "../controllers/task.controller";

const boardRouter = express.Router();

boardRouter.post("/lists/", createList);
boardRouter.put("/lists/reorder", reorderList);
boardRouter.put("/lists/:id", updateList);
boardRouter.delete("/lists/:id", deleteList);
boardRouter.get("/lists", getLists);

boardRouter.post("/tasks/", createTask);
boardRouter.put("/tasks/reorder", reorderTask);
boardRouter.put("/tasks/:id", updateTask);
boardRouter.delete("/tasks/:id", deleteTask);
boardRouter.get("/tasks", getTasks);


export default boardRouter;
