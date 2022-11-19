import express from 'express';

const app = express();
const port = 5000;

app.listen(port, () => {
	console.warn(`Running express on port ${port}`);
});