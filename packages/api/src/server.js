import express from 'express';
import routes from './routes';

const { PORT, TEST_VAR } = process.env;

const app = express();

app.use('/api', routes);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}! Env says ${TEST_VAR}`));