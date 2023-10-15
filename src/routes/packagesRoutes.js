const Router = require('express')
const packageController = require('../controllers/PakcageController')

const packageRoutes = new Router();

packageRoutes.post('/createPackage',packageController.createPackage)
packageRoutes.put('/updatePackages',packageController.updatePackages)
packageRoutes.delete('/deletePackage', packageController.deletePackage)




module.exports = {packageRoutes}