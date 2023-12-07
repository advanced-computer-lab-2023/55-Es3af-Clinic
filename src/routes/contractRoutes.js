const fs = require("fs");
const contractController = require("../controllers/ContractController");
const Router = require("express");

// const authMiddleware = require('../middlewares/authMiddleware');

const contractRoutes = new Router();

// contractRouter.use(express.json());

contractRoutes.get("/doctor/",contractController.viewEmploymentContract)
contractRoutes.post("/", contractController.createContract);
contractRoutes.put("/:contractId", contractController.updateContract);
contractRoutes.delete("/:contractId", contractController.deleteContract);
contractRoutes.get("/:contractId", contractController.getContractById);

module.exports = { contractRoutes };
