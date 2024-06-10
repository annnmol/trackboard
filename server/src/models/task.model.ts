import mongoose, { Document, Types } from "mongoose";

interface ITask extends Document<Types.ObjectId> {
  title: string;
  description: string;
  dueDate: Date;
  priority: "low" | "medium" | "high";
  position: number;
  listId: Types.ObjectId;
  createdBy: Types.ObjectId;
  //timestamps
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new mongoose.Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    priority: { type: String, enum: ["low", "medium", "high"], required: true },
    position: { type: Number, required: true },
    listId: { type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  },
  { timestamps: true }
);

// Add indexes
taskSchema.index({ createdBy: 1,  listId:1});

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
