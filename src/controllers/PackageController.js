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
  const {type, price, sessionDiscount,medicationDiscount,familyMemberDiscount }= req.body;
  const updatedPackage = await Package
    .findOneAndUpdate(
      { type: type },
      { price: price},
      { sessionDiscount: sessionDiscount}, 
      { medicationDiscount: medicationDiscount},
      { familyMemberDiscount:familyMemberDiscount}
    )
    .catch((err) => console.log(err));
    console.log(updatePackage);
  res
    .status(200)
    .send("Package with name " + Name + " is updated successfully");
};


const deletePackage = async (req, res) => {
  try {
    // Log the received id from the request URL
    console.log("ID to delete:", req.params.id);

    // Find and delete the package by id
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);

    // Log the deleted package (if found)
    console.log("Deleted Package:", deletedPackage);

    if (!deletedPackage) {
      return res.status(404).send({ error: "Package not found" });
    }

    return res.send(deletedPackage);
  } catch (e) {
    // Log any errors that occur during the process
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
