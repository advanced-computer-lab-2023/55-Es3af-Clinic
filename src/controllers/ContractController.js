const contract = require("../Models/EmploymentContract.js");
const doctorModel = require("../Models/Doctor");
const mongoose = require("mongoose");

const createContract = async (req, res) => {

  try {
    const contractPayload = req.body
    const newContract = await contract.create(contractPayload)
    res.status(201).json({
      status: "success",
      data: {
        contract: newContract,
      }
    });
  }
  catch (e) {
    res.status(500).json({
      status: "fail",
      message: e.message,
    });
  }

}
const deleteContract = async (req, res) => {
  const contractId = req.params.contractId;
  try {
    const contractToFind = await contract.findById(contractId);
    if (!contractToFind) {
      return res.status(404).json({
        status: "fail",
        message: "Contract not found",
      });
    }
    await contract.findByIdAndDelete(contractId);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}
// create a function to update the contract
const updateContract = async (req, res) => {
  const contractUpdatePayload = req.body;
  const contractId = req.params.contractId;
  try {
    const contractToFind = await contract.findById(contractId);
    if (!contractToFind) {
      return res.status(404).json({
        status: "fail",
        message: "Contract not found",
      });
    }
    const contractUpdated = await contract.findByIdAndUpdate(
      contractId,
      contractUpdatePayload
    );
    res.status(200).json({
      status: "success",
      data: {
        contract: contractUpdated,
      },
    });

  }
  catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

// View my employment contract
const viewEmploymentContract = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    var doctorId;
    jwt.verify(token, 'supersecret', (err ,decodedToken) => {
      if (err) {
        res.status(401).json({message: "You are not logged in."})
      }
      else {
        doctorId = decodedToken.name;
      }
    });
    const idObject = new mongoose.Types.ObjectId(doctorId)
    console.log(idObject)
    const doctor = await doctorModel.findById(idObject);
    console.log(doctor)
    if (!doctor) {
      return res.status(404).json({
        status: "fail",
        message: "Doctor not found",
      });
    }
    const contracts = await contract.find({ doctor: doctor._id });
    if (!contract) {
      return res.status(404).json({
        status: "fail",
        message: "Contract not found"
      })
    }
    res.status(200).json({
      status: "success",
      data: {
        contracts,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }

}

const getContractById = async (req, res) => {
  const contractId = req.params.contractId;
  try {
    const contractToFind = await contract.findById(contractId);
    if (!contractToFind) {
      return res.status(404).json({
        status: "fail",
        message: "Contract not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        contract: contractToFind,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}


module.exports = { viewEmploymentContract, createContract, updateContract, deleteContract, getContractById }
