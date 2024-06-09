import mongoose, { Document, Types } from "mongoose";

interface ITransaction extends Document<Types.ObjectId> {
  walletId: Types.ObjectId;
  balance: number;
  amount: number;
  description: string;
  type: "CREDIT" | "DEBIT";
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new mongoose.Schema<ITransaction>(
  {
    walletId: { type: mongoose.Schema.Types.ObjectId, ref: "Wallet", required: true},
    balance: { type: Number, default: 0.0, required: true },
    amount: { type: Number, default: 0.0, required: true },
    description: { type: String, default: "other", required: true },
    type: { type: String, enum: ["CREDIT", "DEBIT"], required: true },
  },
  { timestamps: true }
);

// Add indexes
transactionSchema.index({ walletId: 1 });

const Transaction = mongoose.model<ITransaction>("Transaction", transactionSchema);

export default Transaction;
