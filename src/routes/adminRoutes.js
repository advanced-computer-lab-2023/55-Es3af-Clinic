const Router = require('express')
const adminController = require('../controllers/AdminController')

const adminRoutes = new Router();

adminRoutes.post('/addAdmin', adminController.addAdmin)
adminRoutes.get('/listUsers', adminController.listUsers)
adminRoutes.delete('/deleteUser/:id', adminController.deleteUser)
adminRoutes.get('/viewDoctorData',adminController.viewDoctorData);





module.exports = {adminRoutes}