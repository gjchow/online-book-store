import express from "express";
import cors from "cors";

// Setup server
const app = express();
app.use(cors());
app.use(express.static('client'));

export default app;
