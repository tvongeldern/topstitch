const express = require('express');

const { PORT, TEST_VAR } = process.env;

const app = express();

app.get('/', (req, res) => res.send(`Hello World! testvar is "${TEST_VAR}"`));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}! Env says ${TEST_VAR}`));