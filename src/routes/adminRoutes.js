const Router = require("express");
const adminController = require("../controllers/AdminController");
const userController = require("../controllers/UserController");


const adminRoutes = new Router();

adminRoutes.put("/updatePassword", userController.changePassword);
adminRoutes.post("/addAdmin", adminController.addAdmin);
adminRoutes.post("/createUser", userController.createUser);
adminRoutes.get("/listUsers", adminController.listUsers);
adminRoutes.delete("/deleteUser/:username", adminController.deleteUser);
adminRoutes.get("/viewDoctorData", adminController.viewDoctorData);
adminRoutes.put("/acceptDoctorRequest/:id", adminController.acceptDoctorRequest);
adminRoutes.put("/rejectDoctorRequest/:id", adminController.rejectDoctorRequest);




module.exports = { adminRoutes };
