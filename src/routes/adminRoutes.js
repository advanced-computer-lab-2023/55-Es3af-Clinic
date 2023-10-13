const Router = require('express')
const adminController = require('../controllers/AdminController')

const adminRoutes = new Router();

adminRoutes.post('/addAdmin', adminController.addAdmin)
adminRoutes.get('/listUsers', adminController.listUsers)
adminRoutes.delete('/deleteUser/', adminController.deleteUser)
adminRoutes.get('/viewDoctorData',adminController.viewDoctors)





module.exports = {adminRoutes}