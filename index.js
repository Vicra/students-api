const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

require('dotenv').config();

const app = express();

const db = require('./db/memory-database')
app.use(cors())

app.use(bodyParser.json());

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

db({ test: false })

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// instancias de routes
const studentsRouter = require("./routes/studentRoutes");
const classRouter = require("./routes/classRoutes");
const orderRouter = require("./routes/orderRouter");

// Definicion de routes
app.use('/student', studentsRouter);
app.use('/class', classRouter);
app.use('/order', orderRouter);

app.listen(3001);