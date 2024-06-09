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

export const CreateTransactionSchema = ({ description, amount, type }: any) => {
  if (!["CREDIT", "DEBIT"].includes(type)) {
    return {
      message: "type should be either CREDIT or DEBIT.",
      status: false,
    };
  }
  if (amount < 1) {
    return {
      message: "amount cannot be zero.",
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
