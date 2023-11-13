const Router = require("express");
const adminController = require("../controllers/AdminController");
const userController = require("../controllers/UserController");


const adminRoutes = new Router();

adminRoutes.put("/:id/updatePassword", adminController.changePassword);
adminRoutes.get("/:id/updatePassword", adminController.getPassword);
adminRoutes.post("/addAdmin", adminController.addAdmin);
adminRoutes.post("/createUser", userController.createUser);
adminRoutes.get("/listUsers", adminController.listUsers);
adminRoutes.delete("/deleteUser/:id", adminController.deleteUser);
adminRoutes.get("/viewDoctorData", adminController.viewDoctorData);
adminRoutes.put("/:id/updatePassword", adminController.changePassword);
adminRoutes.put("/acceptDoctorRequest/:id", adminController.acceptDoctorRequest);
adminRoutes.put("/rejectDoctorRequest/:id", adminController.rejectDoctorRequest);




module.exports = { adminRoutes };
