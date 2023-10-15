const Router = require('express')
const packageController = require('../controllers/PackageController')

const packageRoutes = new Router();

packageRoutes.post('/createPackage',packageController.createPackage)
//packageRoutes.put('/updatePackages',packageController.updatePackage)
packageRoutes.delete('/deletePackage/:id', packageController.deletePackage)




module.exports = {packageRoutes}