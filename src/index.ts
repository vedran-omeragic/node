import { config } from "dotenv";
config();
import express from "express";

const app = express();
const port = 5000;

app.listen(port, () => {
	console.log(`Running express on port ${port}`);
});
