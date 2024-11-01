import express from "express";
import cors from "cors";
import mainRouter from "./routes";
import 'dotenv/config'
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/", mainRouter);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
