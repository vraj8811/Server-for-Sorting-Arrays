const express = require('express');
const { performance } = require('perf_hooks');

const app = express();
const port = 8000;

app.use(express.json());

app.use('/api/sort', require('./routes/sort'))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});