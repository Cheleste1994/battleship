import express from "express";
import { createServer } from "http";
import serverWS from "./src/serverWS";
import cors from "cors";

const PORT = 5000;

const app = express();

app.use(cors());

const httpServer = createServer(app);

serverWS(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
