import express from "express";
import { createServer } from "http";
import WS from "./src/ws/index";
import cors from "cors";

const PORT = 5000;

const app = express();

app.use(cors());

const httpServer = createServer(app);

WS(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
