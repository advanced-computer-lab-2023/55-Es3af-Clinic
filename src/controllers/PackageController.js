const express = require('express');
const Package = require("../Models/Packages.js");


const silverPackage = {
  type: "Silver",
  price: 3600,
  sessionDiscount: 40,
  medicationDiscount: 20,
  familyMemberDiscount: 10,
};

const goldPackage = {
  type: "Gold",
  price: 6000,
  sessionDiscount: 60,
  medicationDiscount: 30,
  familyMemberDiscount: 15,
};

const platinumPackage = {
  type: "Platinum",
  price: 9000,
  sessionDiscount: 80,
  medicationDiscount: 40,
  familyMemberDiscount: 20,
};

const createPackage = async (req, res) => {
  try {
    const {
      type,
      price,
      sessionDiscount,
      medicationDiscount,
      familyMemberDiscount,
    } = req.body;

    const packageData = {
      type,
      price,
      sessionDiscount,
      medicationDiscount,
      familyMemberDiscount,
    };

    const newPackage = await Package.create(packageData);
    res.status(201).send(newPackage);
  } catch (e) {
    res.status(400).send(e);
  }
};

const updatePackage = async (req, res) => {
  try {
    const { type, price, sessionDiscount, medicationDiscount, familyMemberDiscount } = req.body;


    const updatedPackage = await Package.findOneAndUpdate(
      { type: type },
      {
        $set: {
          price: price,
          sessionDiscount: sessionDiscount,
          medicationDiscount: medicationDiscount,
          familyMemberDiscount: familyMemberDiscount,
        },
      },
      { new: true }
    );

    if (updatedPackage) {
      console.log(updatedPackage);
      res.status(200).send("Package with type " + type + " is updated successfully");
    } else {
      res.status(404).send("Package not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};



const deletePackage = async (req, res) => {
  try {
    const packageId = req.params.id;

    console.log("ID to delete:", packageId);

    // Attempt to find the package before deletion
    const packageToDelete = await Package.findOne({ _id: packageId });
    
    if (!packageToDelete) {
      return res.status(404).send({ error: "Package not found" });
    }

    // Perform the deletion
    const deletedPackage = await Package.findOneAndDelete({ _id: packageId });

    console.log("Deleted Package:", deletedPackage);

    if (!deletedPackage) {
      return res.status(404).send({ error: "Package not found during deletion" });
    }

    res.status(200).send("Package deleted successfully");
  } catch (e) {
    console.error("Error:", e);
    return res.status(500).send(e);
  }
};




const viewPackages = async (req, res) => {
  try {
    const pkgData = await Package.find({});
    res.send(pkgData);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = { createPackage, deletePackage, updatePackage, viewPackages };
