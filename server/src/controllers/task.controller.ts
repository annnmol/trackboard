import { Request, Response } from "express";
import mongoose from "mongoose";

//user defined
import {
  CreateListSchema,
} from "../validations/board.validation";

import Task from "../models/task.model";

const createTask = async (req: any, res: Response) => {
  try {
    const { title, description,dueDate,priority,listId } = req?.body;
    const result = CreateListSchema(req?.body);

    if (!result.status) {
      // Validation failed,
      return res.status(400).json({ error: result?.message ?? "Invalid data" });
    }

    const position = await Task.countDocuments({ listId });
    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      listId: listId,
      position: position,
      createdBy: req?.user?._id,
    });

    await newTask.save();

    res.status(201).json({
      data: {
        _id: newTask._id.toString(),
        title: newTask.title,
        position: newTask.position,
        createdBy: newTask.createdBy,
        dueDate: newTask.dueDate,
        priority: newTask.priority,
        listId: newTask.listId,
        description: newTask.description,
      },
    });
  } catch (error) {
    console.log("Error in create list controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = req?.user?._id;

    if (!userId) {
      return res.status(400).json({ error: "User not found" });
    }

    const tasks = await Task.find({ createdBy: userId }).select("-createdAt -__v");

    res.status(200).json({
      data: tasks,
    });
  } catch (error) {
    console.log("Error in get task controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req?.params;
    const { title, description,dueDate,priority, listId } = req?.body;

    const objectId = new mongoose.Types.ObjectId(id);
    const task = await Task.findById(objectId).select("-createdAt -__v");

    if (!task) {
      return res.status(404).json({ error: "task not found" });
    }

    task.title = title?.trim();
    task.description = description;
    task.dueDate = dueDate;
    task.priority = priority;
    task.listId = listId;

    await task.save();

    res.status(200).json({
      data: {
        _id: task._id.toString(),
        title: task.title,
        description:task.description,
        position: task.position,
        createdBy: task.createdBy,
        dueDate: task.dueDate,
        priority: task.priority,
        listId: task.listId,
      },
    });
  } catch (error) {
    console.log("Error in put task controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req?.params;

    const taskObjectId = new mongoose.Types.ObjectId(id as string);

    let task = await Task.findOneAndDelete({ _id: taskObjectId });

    if (!task) {
      return res.status(404).json({ error: "task not found" });
    }
    res.status(201).json({ data: task });
  } catch (error: any) {
    console.log("Error in delete task controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const reorderTask = async (req: Request, res: Response) => {
  try {
    const userId = req?.user?._id;
    const data = req.body;

    const updatePromises = data?.map((item:any) => {
      return Task.updateOne(
        { _id: item._id, createdBy: userId },
        { position: item.position, listId: item.listId}
      );
    });

    await Promise.all(updatePromises);
    
    // Fetch the updated lists
    const tasks = await Task.find({ createdBy: userId }).sort({ position: 1 });

    res.status(200).json({
      data: tasks,
    });
  } catch (error) {
    console.log("Error in put list controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createTask, deleteTask, getTasks, updateTask, reorderTask };
