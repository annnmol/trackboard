import express from "express";

//user defined
import { createList, deleteList, getLists, updateList } from "../controllers/list.controller";

const boardRouter = express.Router();

boardRouter.post("/lists/", createList);
boardRouter.put("/lists/:id", updateList);
boardRouter.delete("/lists/:id", deleteList);
boardRouter.get("/lists", getLists);

// boardRouter.post("/transact/:id", createTransaction);
// boardRouter.get("/transactions", getTransactions);
// boardRouter.get("/export/transactions", exportTransactions);


export default boardRouter;
