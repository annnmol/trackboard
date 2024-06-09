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

export const CreateTransactionSchema = ({ description, amount, id }: any) => {
  if (!Types.ObjectId.isValid(id)) {
    return {
      message: "id should be a valid ObjectID.",
      status: false,
    };
  }
  if (typeof amount !== "number") {
    return {
      message: "amount should be a number.",
      status: false,
    };
  }
  if (description.length < 4) {
    return {
      message: "description should be at least 4 characters long.",
      status: false,
    };
  }
  if (description.length > 50) {
    return {
      message: "description should be at most 50 characters long.",
      status: false,
    };
  }
 
  return {
    message: "",
    status: true,
  };
};

export const CreateWalletSchema = ({ name, balance }: any) => {
  if (name.length < 4) {
    return {
      message: "name should be at least 4 characters long.",
      status: false,
    };
  }
  if (name.length > 30) {
    return {
      message: "name should be at most 30 characters long.",
      status: false,
    };
  }
  if (balance < 0) {
    return {
      message: "balance should be a positive number.",
      status: false,
    };
  }
  return {
    message: "",
    status: true,
  };
}; 


export const GetWalletByIdSchema = ({ id }: any) => {
  if (!Types.ObjectId.isValid(id)) {
    return {
      message: "id should be a valid ObjectID.",
      status: false,
    };
  }
  return {
    message: "",
    status: true,
  };
};

export const UpdateWalletSchema = ({ id, name }: any) => { 
  if (!Types.ObjectId.isValid(id)) {
    return {
      message: "id should be a valid ObjectID.",
      status: false,
    };
  }
  if (name.length < 4) {
    return {
      message: "name should be at least 4 characters long.",
      status: false,
    };
  }
  if (name.length > 30) {
    return {
      message: "name should be at most 30 characters long.",
      status: false,
    };
  }
  return {
    message: "",
    status: true,
  };
};
