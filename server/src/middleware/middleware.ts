import { NextFunction, Response,Request } from "express";

const middleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log("middleware", req?.headers);
    // check if the token is present in the request headers 
    //otherwise throw an error
    next();
  } catch (error: any) {
    console.log("Error in middleware: ", error?.message);
    res.status(500).json({ error: "unauthorized" });
  }
};

export default middleware;
