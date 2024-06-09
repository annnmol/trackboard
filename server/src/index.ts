import cookieParser from "cookie-parser";
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import http from "node:http";

//user defined imports
import connectToMongoDB from './lib/mongoDB';
import { errorHandlingLogging, healthCheckLogging, incomingRequestLogging } from './lib/utils';
import middleware from './middleware/middleware';
import walletRouter from './routes/wallet.routes';
import authRouter from "./routes/auth.routes";

config();

const PORT = Number(process.env.PORT ?? 5000);

/** EXPRESS app initialize */
const app = express();

/** http Server Handling */
const httpServer = http.createServer(app);

app.use(cors({
  origin: "*",
}));

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser()); // to parse the incoming requests with cookies

/** Log the incoming request */
app.use(incomingRequestLogging);

// Health check endpoint
app.get("/api/health-check", healthCheckLogging);

// auth routes
app.use("/api/auth", authRouter);

//* Middleware
app.use(middleware)

//* Protected Routes
app.use("/api", walletRouter);

/** Route Error handling */
app.use(errorHandlingLogging);

connectToMongoDB();

//app start
httpServer.listen(PORT, () => {
  console.info(`Server is running at PORT: ${PORT}`);
});

// export default app;
export default { app };
