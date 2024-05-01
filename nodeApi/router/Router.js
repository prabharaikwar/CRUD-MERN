const express = require("express");
const route = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");

route.use(bodyParser.json());
route.use(bodyParser.urlencoded({ extended: true }));

const Controller = require('../controller/Controller');
route.use(cors());

//creating routes
route.get('/', Controller.getAllEmployee);
route.post('/', Controller.createEmployee);
route.get('/:id', Controller.getEmployeeById);
route.put('/:id', Controller.updateEmployee);
route.delete('/:id', Controller.deleteEmployee);

module.exports = route;

