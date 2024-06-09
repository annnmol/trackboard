import mongoose, { Document, Types } from "mongoose";

interface IWallet extends Document<Types.ObjectId> {
  balance: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const walletSchema = new mongoose.Schema<IWallet>(
  {
    balance: { type: Number, default: 0.0,required: true},
    name: { type: String, default: "", required: true },
  },
  { timestamps: true }
);

// Add indexes
walletSchema.index({ name: 1 });

const Wallet = mongoose.model<IWallet>("Wallet", walletSchema);

export default Wallet;
