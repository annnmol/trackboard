import { Types } from "mongoose";

export const CreateListSchema = ({ title }: any) => {
  if (title.length < 1) {
    return {
      message: "title should be at least 4 characters long.",
      status: false,
    };
  }

  if (title.length > 50) {
    return {
      message: "title should be at most 50 characters long.",
      status: false,
    };
  }

  return {
    message: "",
    status: true,
  };
};

export const CreateTaskSchema = ({ title,description,dueDate,priority,listId}: any) => {
  if (title.length < 2) {
    return {
      message: "name should be at least 4 characters long.",
      status: false,
    };
  }
  if (description.length < 2) {
    return {
      message: "name should be at most 30 characters long.",
      status: false,
    };
  }
  if (isNaN(Date.parse(dueDate))) {
    return {
      message: "dueDate should be a valid date.",
      status: false,
    };
  }

  if (!["low", "medium", "high"].includes(priority)) {
    return {
      message: "priority should be low, medium or high.",
      status: false,
    };
  }

  if (!Types.ObjectId.isValid(listId)) {
    return {
      message: "listId should be a valid ObjectID.",
      status: false,
    };
  }

  return {
    message: "",
    status: true,
  };
}; 
