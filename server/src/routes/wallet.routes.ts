import express from "express";

//user defined
import { createTransaction, exportTransactions, getTransactions } from "../controllers/transaction.controller";
import { createWallet, getWalletById, updateWallet } from "../controllers/wallet.controller";

const walletRouter = express.Router();

walletRouter.post("/wallet/setup", createWallet);
walletRouter.put("/wallet/:id", updateWallet);
walletRouter.get("/wallet/:id", getWalletById);

walletRouter.post("/transact/:id", createTransaction);
walletRouter.get("/transactions", getTransactions);
walletRouter.get("/export/transactions", exportTransactions);


export default walletRouter;
