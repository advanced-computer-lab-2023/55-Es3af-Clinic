const Package = require('../Models/package.js');
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

const listPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.send(packages);
  } catch (e) {
    res.status(400).send(e);
  }
};

const deletePackage = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    if (!deletedPackage) {
      res.status(404).send({ error: 'Package not found' });
    } else {
      res.send(deletedPackage);
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = { createPackage, deletePackage, listPackages };
