import { Request, Response } from "express";
import mongoose from "mongoose";

//user defined
import { CreateListSchema } from "../validations/board.validation";

import List from "../models/list.model";
import Task from "../models/task.model";

const createList = async (req: any, res: Response) => {
  try {
    const { title } = req?.body;
    const result = CreateListSchema(req?.body);

    if (!result.status) {
      // Validation failed,
      return res.status(400).json({ error: result?.message ?? "Invalid data" });
    }

    const position = await List.countDocuments();
    const newList = new List({
      title,
      position: position,
      tasks: [],
      createdBy: req?.user?._id,
    });

    await newList.save();

    res.status(201).json({
      data: {
        _id: newList._id.toString(),
        title: newList.title,
        position: newList.position,
        createdBy: newList.createdBy,
        tasks: newList.tasks,
      },
    });
  } catch (error) {
    console.log("Error in create list controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getLists = async (req: Request, res: Response) => {
  try {
    const userId = req?.user?._id;

    if (!userId) {
      return res.status(400).json({ error: "User not found" });
    }

    const lists = await List.find({ createdBy: userId }).sort({ position: 1 });
    const tasks = await Task.find({ createdBy: userId }).sort({ position: 1 });

    res.status(200).json({
      data: { lists, tasks },
    });
  } catch (error) {
    console.log("Error in get list controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateList = async (req: Request, res: Response) => {
  try {
    const { id } = req?.params;
    const { title } = req?.body;

    const objectId = new mongoose.Types.ObjectId(id);
    const list = await List.findById(objectId).select("-createdAt -__v");

    if (!list) {
      return res.status(404).json({ error: "list not found" });
    }

    list.title = title?.trim();
    await list.save();

    res.status(200).json({
      data: {
        _id: list._id.toString(),
        title: list.title,
        position: list.position,
        createdBy: list.createdBy,
        tasks: list.tasks,
      },
    });
  } catch (error) {
    console.log("Error in put list controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteList = async (req: Request, res: Response) => {
  try {
    const { id } = req?.params;

    const listObjectId = new mongoose.Types.ObjectId(id as string);

    let list = await List.findOneAndDelete({ _id: listObjectId });

    if (!list) {
      return res.status(404).json({ error: "list not found" });
    }

    // Delete all tasks associated with the list
    await Task.deleteMany({ listId: listObjectId });

    // Fetch all lists and sort them by position
    const lists = await List.find().sort({ position: -1 });

    // Update the position of each list
    for (let i = 0; i < lists.length; i++) {
      lists[i].position = i;
      await lists[i].save();
    }

    res.status(201).json({ data: list });
  } catch (error: any) {
    console.log("Error in delete list controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const reorderList = async (req: Request, res: Response) => {
  try {
    const userId = req?.user?._id;
    const data = req.body;

    const updatePromises = data?.map((item:any) => {
      return List.updateOne(
        { _id: item._id, createdBy: userId },
        { position: item.position }
      );
    });

    await Promise.all(updatePromises);
    
    // Fetch the updated lists
    const lists = await List.find({ createdBy: userId }).sort({ position: 1 });

    res.status(200).json({
      data: lists,
    });
  } catch (error) {
    console.log("Error in put list controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createList, deleteList, getLists, updateList, reorderList };
