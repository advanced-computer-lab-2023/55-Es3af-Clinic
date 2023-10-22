const Package = require('../Models/Packages.js');

const silverPackage = {
    type: 'Silver',
    price: 3600,
    sessionDiscount: 40,
    medicationDiscount: 20,
    familyMemberDiscount: 10
  };
  
  const goldPackage = {
    type: 'Gold',
    price: 6000,
    sessionDiscount: 60,
    medicationDiscount: 30,
    familyMemberDiscount: 15
  };
  
  const platinumPackage = {
    type: 'Platinum',
    price: 9000,
    sessionDiscount: 80,
    medicationDiscount: 40,
    familyMemberDiscount: 20
  };

const createPackage = async (req, res) => {
  try {
    const { type, price, sessionDiscount, medicationDiscount, familyMemberDiscount } = req.body;

    const packageData = {
      type,
      price,
      sessionDiscount,
      medicationDiscount,
      familyMemberDiscount
    };

    const newPackage = await Package.create(packageData);
    res.status(201).send(newPackage);
  } catch (e) {
    res.status(400).send(e);
  }
};

const updatePackage = async (req, res) => {
  const {type, price, sessionDiscount, medicationDiscount, familyMemberDiscount}= req.body;
  
 // var Name = req.body.Name;
  //var Price = req.body.Price;
  //var ActiveIngredients = req.body.ActiveIngredients;
  packageModel
    .findOneAndUpdate(
      { type: type },
      { price: price},
      { sessionDiscount: sessionDiscount }, 
      { medicationDiscount: medicationDiscount}, 
      { familyMemberDiscount: familyMemberDiscount}
    )
    .catch((err) => console.log(err));
  res
    .status(200)
    .send("Package is updated successfully");
};

const deletePackage = async (req, res) => {
  try {
<<<<<<< HEAD
    res.send(await Package.findByIdAndDelete(req.params.id));
=======
    const deletedPackage = await Package.findOne(req.params.id);
    if (!deletedPackage) {
      res.status(404).send({ error: 'Package not found' });
    } else {
      res.send(deletedPackage);
    }
>>>>>>> c763c4f (old changes from sprint #1)
  } catch (e) {
    res.status(400).send(e);
  }

<<<<<<< HEAD

  // try {
  //   const deletedPackage = await Package.findByIdAndDelete(req.params.id);
  //   if (!deletedPackage) {
  //     res.status(404).send({ error: 'Package not found' });
  //   } else {
  //     res.send(deletedPackage);
  //   }
  // } catch (e) {
  //   res.status(400).send(e);
  // }
};
const viewPackages = async (req, res) =>{
  try {
    const pkgData = await Package.find({});
    res.send(pkgData);
  } catch (e) {
    res.status(400).send(e);
  }

}
module.exports = { createPackage, deletePackage, viewPackages };
=======
module.exports = { createPackage, deletePackage, updatePackages };
>>>>>>> c763c4f (old changes from sprint #1)
