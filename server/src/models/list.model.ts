import mongoose, { Document, Types } from "mongoose";

interface IList extends Document<Types.ObjectId> {
  title: string;
  position: number;
  tasks: Types.ObjectId[];
  createdBy: Types.ObjectId;
  //timestamps
  createdAt: Date;
  updatedAt: Date;
}

const listSchema = new mongoose.Schema<IList>(
  {
    title: { type: String, required: true },
    position: { type: Number, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  },
  { timestamps: true }
);

// Add indexes
listSchema.index({ createdBy: 1 });

const List = mongoose.model<IList>("List", listSchema);

export default List;
