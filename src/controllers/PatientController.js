const patientModel = require("../Models/Patient.js")
const familyMemberModel = require("../Models/FamilyMembers.js")
const doctorModel = require("../Models/Doctor.js")
const userModel = require('../Models/user.js')
const packageModel = require('../Models/Packages.js')
const appointmentModel = require('../Models/Appointments.js')
const PrescriptionsModel = require('../Models/Prescriptions.js')
const { error } = require("console")
const { default: mongoose } = require('mongoose');
const { disconnect } = require("process")

const test = async(req, res) => {
    // const newDoc = new doctorModel({


    //     // username: 'doc2',
    //     // name: 'doc2',
    //     // email: 'doc2@email.com',
    //     // password: 'doc2',
    //     // dateOfBirth: '2002-11-11',
    //     // type: 'doctor',
    //     // hourlyRate: 5,
    //     // affiliation: 'hospital',
    //     // educationBackground: 'uni',
    //     // speciality: 'surgery'

    //     username: 'doc2',
    //     password: 'fsfs',
    //     name: 'doc2',
    //     email: 'doc2@email.com',
    //     dateOfBirth: '2000-11-12',
    //     hourlyRate: 5,
    //     affiliation: 'place',
    //     educationBackground: 'college',
    //     speciality: 'surgery'
    // })
    // newDoc.save().catch(err => console.error(err))
    // res.status(200).send(newDoc)

//     const package = new packageModel({
//         type: 'Gold',
//         price: 6000,
//         sessionDiscount: 0.6,
//         medicationDiscount: 0.3,
//         familyMemberDiscount: 0.15
//     })
//     package.save().catch(err => console.error(err))
//     console.log(package)
//     res.status(200).send(package)

    const app = await appointmentModel.find({date: req.query.date})
    res.status(200).send(app)
}

const getPatient = async(req, res) => {
    try{
        const patient = await patientModel.findById(req.params.id)
        res.send(patient)
    } catch(e){
        res.status(400).send(e)
    }
}

//working fine and testing fine
const addFamilyMember = async(req, res) => {
    const patient =req.query.patient;
    const patientID=await userModel.findOne({ username: patient });
    console.log(req.body)

    const member = new familyMemberModel({
        name : req.body.name,
        nationalID : req.body.nationalID,
        age : req.body.age,
        gender : req.body.gender,
        relationToPatient : req.body.relationToPatient,
        patient : patientID._id //id zy ma heya
    })
    
    console.log(`family member is ${member}`)
    //var patient = member.patient
    //console.log(`patient is ${patient}`)

    familyMemberModel.find({patient: member.patient})
        .exec()
        .then((document) => {
            console.log(`family members are ${document}`)
            familyMemberModel.findOne({name: member.name})
                .exec()
                .then((document2) => {
                    if(document2){
                        console.log('Family member already exists')
                        res.status(200).send('Family member already exists')
                        return
                    }
                    else{
                        member.save().catch(err => console.log(err))
                        console.log("Family member added")
                        res.status(200).send('Family member added')
                    }
                })
                .catch((err) => {console.error(err)})

        .catch((err) => {console.error(err)})
        })
}

//working fine testing fine
const viewFamilyMembers = async (req, res) => {
    const neededPatient = req.query.patient;
    console.log(`Patient is ${neededPatient}`);
    
    try {
      const neededPatientID = await userModel.findOne({ username: neededPatient });
      
      if (!neededPatientID) {
        console.log("Patient not found.");
        res.status(404).send("Patient not found");
        return;
      }
      
      console.log("Patient ID:", neededPatientID._id);
      
      familyMemberModel
        .find({ patient: neededPatientID._id })
        .exec()
        .then((result) => {
          if (Object.keys(result).length === 0) {
            res.status(200).send("You don't have any family members added");
          } else {
            res.status(200).send(result);
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send("Internal Server Error");
        });
    } catch (error) {
      console.error("Error finding patient:", error);
      res.status(500).send("Internal Server Error");
    }
  };

//working fine testing fine
const viewDoctors = async(req, res) => {
    var patient = req.query.patient //username

    doctorModel.find({})
        .exec()
        .then(async (docResult) => {
            if(Object.keys(docResult).length === 0) {
                res.status(200).send('There is no doctors')
            }
            else{
                const docArr = []
                const docPrice = []
                for(const doctor of docResult) {
                    docArr.push(doctor)
                    var price
                    try{
                        console.log(`doctor is ${doctor}`)
                        price = await doctorPrice(patient, doctor.username)
                        console.log(`returned price from function is ${price}`)
                        docPrice.push(price)
                    }
                    catch(err){console.error(err)}
                }
                const docInfo = []
                for(let i = 0; i < docArr.length; i++){
                    let info = {
                        name: docArr[i].name,
                        speciality: docArr[i].speciality,
                        price: docPrice[i]
                    }
                docInfo.push(info)
                }
                //var discount = 0




                
                // patientModel.findOne({username : patient})
                //     .exec()
                //     .then((patientResult) => {
                //         console.log(`patient is ${patientResult}`)
                //         if(patientResult.package !== 'none'){
                //             console.log('has package')
                //             packageModel.findOne({type: patientResult.package})
                //                 .exec()
                //                 .then((packageResult) => {
                //                     console.log(`package is ${packageResult}`)
                //                     discount = packageResult.sessionDiscount

                //                     console.log(`doctor is ${docArr} and discount is ${discount} and hourly rate is ${docResult.hourlyRate}`)
                //                     const docPrices = []
                //                     docResult.forEach((result) => docPrices.push((result.hourlyRate * 1.1) * (1 - discount)))
                //                     const docInfo = []
                //                     for(let i = 0; i < docArr.length; i++){
                //                         let info = {
                //                             name: docArr[i].name,
                //                             speciality: docArr[i].speciality,
                //                             price: docPrices[i]
                //                         }
                //                         docInfo.push(info)
                //                     }
                //                     res.status(200).send(docInfo)
                //                 })
                //                 .catch((err) => {console.error(err)})
                //         }
                //         else{
                //             const docPrices = []
                //             docResult.forEach((result) => docPrices.push(result.hourlyRate * 1.1))
                //             const docInfo = []
                //             for(let i = 0; i < docArr.length; i++){
                //                 let info = {
                //                     name: docArr[i].name,
                //                     speciality: docArr[i].speciality,
                //                     price: docPrices[i]
                //                 }
                //                 docInfo.push(info)
                //             }
                //             res.status(200).send(docInfo)
                //         }
                        
                //     })
                //     .catch((err) => {console.error(err)})
                
                // var docInfo = {
                //     name: docResult.name,
                //     speciality: docResult.speciality,
                //     price : docPrice
                // }
                //res.status(200).send(docInfo)
                // userModel.findById(docResult.user)
                //     .exec()
                //     .then((docUserResult) => {
                //         console.log(`user is ${docUserResult}`)
                        
                        
                //     })
                //     .catch((err) => {console.error(err)})
                res.status(200).send(docInfo)
            }
        })
        .catch((err) => {console.error(err)})
}

//working fine
async function doctorPrice(patientUsername, doctorUsername){

        let sessionPrice;
        const doctor = await doctorModel.findOne({username: doctorUsername});
        console.log(`doctor in function is ${doctor}`)
        sessionPrice = doctor.hourlyRate * 1.1
        console.log(`patient username in function ${patientUsername}`)
        const patient = await patientModel.findOne({username: patientUsername});
        console.log(`patient in function is ${patient}`)
        if (patient.package !== 'none') {
            const package = await packageModel.findOne({type: patient.package})
            console.log(`package in function is ${package}`)
            sessionPrice = sessionPrice * (1 - package.sessionDiscount)
        }
        return sessionPrice
        //var hourlyRate = 0
        // doctorModel.findOne({username: doctorUsername})
        //     .exec()
        //     .then((doctor) => {
        //         sessionPrice = doctor.hourlyRate * 1.1
        //         console.log(`initial price is ${sessionPrice} inside function`)
        //     })
        //     .catch((err) => {console.error(err)})

        // patientModel.findOne({username: patientUsername})
        //     .exec()
        //     .then((patient) => {
        //         console.log(`patient is ${patient} inside function`)
        //         if(patient.package !== 'none'){
        //             packageModel.findOne({type: patient.package})
        //             .exec()
        //             .then((package) => {
        //                 console.log(`package is ${package} inside function`)
        //                 discount = package.sessionDiscount
        //                 sessionPrice = sessionPrice * (1 - discount)
        //                 console.log(`price is ${sessionPrice} inside function inside if package`)
        //                 //return sessionPrice
        //             })
        //             .catch((err) => {console.error(err)})
        //         }
        //         else{
        //             sessionPrice = hourlyRate * 1.1
        //             console.log(`price is ${sessionPrice} inside function inside else package`)
        //         }
                
        //     })
        //     return sessionPrice
        //})
        //.catch((err) => {console.error(err)})
}

//working fine testing fine
// const searchDoctorsByName = async(req, res) => {
//     var docName = req.query.docName
//     var patientUsername = req.body.username
//     doctorModel.find({name: docName})
//         .exec()
//         .then(async (result) => {
//             console.log(`doctors are ${result}`)
//             if(Object.keys(result).length === 0){
//                 res.status(200).send(`There is no results for ${docName}`)
//             }
//             else {
//                 const info = []
//                 for(var doctor of result){
//                     var price = await doctorPrice(patientUsername, doctor.username)
//                     console.log(`doc price is ${price}`)
//                     var docInfo = {
//                         name: result.name,
//                         speciality: result.speciality,
//                         price: price
//                     }
//                     info.push(docInfo)
//                 }
//                 res.status(200).send(info)
//             }
//         })
//         .catch((err) => {console.error(err)})
// }


// const searchDoctorsBySpeciality = async(req, res) =>{
//     var docSpec = req.query.speciality
//     doctorModel.find({speciality : docSpec})
//         .exec()
//         .then((result) => {
//             if(Object.keys(result).length === 0){
//                 res.status(200).send(`There is no results for ${docSpec}`)
//             }
//             else {res.status(200).send(result)}
//         })
//         .catch((err) => {console.error(err)})
// }

async function viewDoctorDetails (doctor, patientUsername){
    //const patient = patientModel.findOneAndDelete({username: patientUsername})
    var details = {
        name: doctor.name,
        speciality: doctor.speciality,
        price : await doctorPrice(patientUsername, doctor.username)
    }
    console.log(`details ${details}`)
    return details
}

//working and testing fine
const searchByNameSpec = async(req, res) => {
    const {name, spec} = req.query
    const patientUsername = req.body.username
    console.log(`name ${name} spec ${spec}`)
    var search = {}
    if(name){search.name = name
    console.log(search)}
    if(spec){search.speciality = spec}
    try{
        console.log(search)
        const doctor = await doctorModel.find(search)
        console.log(`doctors ${doctor}`)
        if(Object.keys(doctor).length === 0){
            res.status(200).send(`There is no results for ${search}`)
        }
        else{
            const info = []
            for(var doc of doctor){
                info.push(await viewDoctorDetails(doc, patientUsername))
            }
            console.log(`all info ${info}`)
            res.status(200).send(info)
        }
    }
    catch(err){console.error(err)}
    // var docSearch = {
    //     name: req.query.name,
    //     spec: req.query.speciality
    // }
    // doctorModel.find({$and: [{name: docSearch.name}, {speciality: docSearch.spec}]})
    //     .exec()
    //     .then((result) => {
    //         if(Object.keys(result).length === 0){
    //             res.status(200).send(`There is no results for ${docSpec}`)
    //         }
    //         else {res.status(200).send(result)}
    //     })
    //     .catch((err) => {console.error(err)})
}

const searchBySpecDate = async(req, res) => {
    const { date, speciality } = req.query;
    const patientID = req.params.id

    try {
        let filter = {patient: patientID};
        var appointments = [] //ids doctors that are busy
        var doctors = []
        var result = []

        const appTest = await appointmentModel.find({date: req.query.date})
        console.log(appTest)

        if(speciality && !date){
            var doctor = await doctorModel.find({speciality: speciality})
            if(doctor){res.status(200).send(doctor)}
            else{res.status(200).send('no doctors with this speciality')}
        }


        else if(date){
            const appoint = await appointmentModel.find({date: req.query.date})
            console.log(`result of find is ${appoint}`)
            if(!appoint){res.status(200).send('no appointments at that time')}
            else{

                for(var app of appoint){
                    var appDate = new Date(app.date)
                    console.log(appDate)

                    // var addedDate = {
                    //     startDate: app.date,
                    //     unit: 'minute',
                    //     amount: app.duration
                    // }
                    var newDate = new Date((appDate.getTime() + (app.duration*60000))-60000*120)

                    console.log(`new date ${newDate}`)
                    // console.log(new Date(app.date.toLocaleString()).getHours())
                    // console.log(app.date.getMinutes())
                    console.log(`given date is ${date}`)
                    if(newDate > date){
                        
                        appointments.push(app.doctor._id.valueOf())}
                }
                const allDoctors = await doctorModel.find({})
                for(var doc of allDoctors){
                    var id = doc._id.valueOf()
                    if(!appointments.includes(id)){
                        console.log(appointments)
                        doctors.push(doc)}
                }
            }
            console.log(`else if date`)
            console.log(doctors)
        }
        console.log(`finished else if date`)
        if(date && speciality){
            for(doc of doctors){
                if(doc.speciality == speciality){result.push(doc)}
            }
            res.status(200).send(result)
        }
        else {
            console.log(`else if date only`)
            res.status(200).send(doctors)}
    //   if (date) {filter.date = date}
    //   if (speciality) {
    //     const doctors = await doctorModel.findOne({speciality: speciality})
    //     console.log(`doctors ${doctors}`)
    //     var docApp = []
    //     if(Object.keys(doctors).length === 0){ res.status(200).send('no doctors available in that speciality')}
    //     else if(Object.keys(doctors).length === 1){
    //         var appointment = await appointmentModel.find({doctor: doctor._id.valueOf()})
    //         if(Object.keys(appointment).length === 0){res.status(200).send('doctor does not have any upcoming appointments')}
    //         else if(Object.keys(appointment).length === 1){
    //             if(date){
    //                 if(date >= (app.date.getMinutes + app.duration)){
    //                     docApp.push(app)
    //                 }
    //             }
    //             else{docApp.push(appointment)}
    //         }
    //         else{
    //             for(var app of appointment){
    //                 if(date){
    //                     if(date >= (app.date.getMinutes + app.duration)){
    //                         docApp.push(app)
    //                     }
    //                 }
    //                 else{docApp.push(appointment)}
    //             }
    //         }
    //     }
    //     else{
    //         for(var doctor of doctors){
    //             var appointment = await appointmentModel.find({doctor: doctor._id.valueOf()})
    //             if(Object.keys(appointment).length === 0){res.status(200).send('doctor does not have any upcoming appointments')}
    //             else if(Object.keys(appointment).length === 1){
    //                 if(date){
    //                     if(date >= (app.date.getMinutes + app.duration)){
    //                         appointments.push(app)
    //                     }
    //                 }
    //                 else{appointments.push(appointment)}
    //             }
    //             else{
    //                 for(var app of appointment){
    //                     if(date){
    //                         if(date >= (app.date.getMinutes + app.duration)){
    //                             appointments.push(app)
    //                         }
    //                     }
    //                     else{appointments.push(appointment)}
    //                 }
    //             }
    //         }
    //     }
    //   }
    //   else{
    //     var appointment = await appointmentModel.find({doctor: doctor._id.valueOf()})
    //     if(Object.keys(appointment).length === 0){res.status(200).send('doctor does not have any upcoming appointments')}
    //     else if(Object.keys(appointment).length === 1){
    //         if(date){
    //             if(date >= (app.date.getMinutes + app.duration)){
    //                 docApp.push(app)
    //             }
    //         }
    //         else{docApp.push(appointment)}
    //     }
    //     else{
    //         for(var app of appointment){
    //             if(date){
    //                 if(date >= (app.date.getMinutes + app.duration)){
    //                     docApp.push(app)
    //                 }
    //             }
    //             else{docApp.push(appointment)}
    //         }
    //     }
    //   }

      //res.status(200).send(result)

      //const appointments = await appointmentModel.find(filter);
      //console.log(appointments)

      //res.status(200).send(appointments);
    }
    catch (err) {
      console.error(err)
    };
};


//working fine testing fine
const viewDocInfo = async(req, res) => {
    const docUsername = req.body.Dusername  //need to work on this
    const patientUsername = req.body.Pusername
    doctorModel.findOne({username: docUsername})
        .exec()
        .then(async (info) => {
            var price = await doctorPrice(patientUsername, docUsername)

            var docInfo = {
                name: info.name,
                affiliation: info.affiliation,
                educationBackground: info.educationBackground,
                speciality: info.speciality,
                price: price
            }
            console.log(docInfo)
            res.status(200).send(docInfo)
        })
        .catch((err) => {console.error(err)})
}

//working and testing fine
const filterAppointmentsByDateAndStatus = async (req, res) => {
    const { date, status } = req.query;
    const patientID = req.params.id;

    try {
      let filter = {patient: patientID};
      if (date) {filter.date = {$gte: date};}
      if (status) {filter.status = status;}

      const appointments = await appointmentModel.find(filter)
      .populate('doctor', 'name -_id -__t');
      console.log(appointments)

      if(appointments){res.status(200).send(appointments);}
      else{res.status(200).send('no results')}
      
    }
    catch (err) {
      res.status(400).json({
        message: err.message
      });
    }
  };


  const viewPrescriptions = async(req, res) => {

        const neededPatient = req.params.id
        console.log(`Patient is ${neededPatient}`)
        PrescriptionsModel.find({patient: neededPatient})
            .populate('doctor', 'name -_id -__t')
            .exec()
            .then((result) => {
                if(Object.keys(result).length === 0){
                    res.status(200).send("You don't have any prescriptions added")
                }
                else{
                    res.status(200).send(result)
                }
            })
            .catch((err) => {console.error(err)})

}

const filterprescriptionsbydatestatusdoctor = async(req, res) => {
    const {date, doctor, status} = req.query;
    const patientid = req.params.id;
    try {
        let filter = {patient: patientid};
        if (date){
            filter.date = date;
        }
        if (status){
            filter.status = status;
        }
        if (doctor){
            
            const doctor1 = await userModel.findOne({ name: doctor });
            if (doctor1) {
                filter.doctor = doctor1.id;
            }
        }
       const prescription = await PrescriptionsModel.find(filter)
       .populate('doctor', 'name -_id -__t')
        res.status(200).send(prescription)
    }catch (err) {
        console.error(err);

    }


}

const getPatients = async (req, res) => {
    //retrieve all patients from the database
    const patients= await patientModel.find({});
    console.log(patients);
    res.status(200).send(patients);
   }

//module.exports = {addFamilyMember, viewFamilyMembers, viewDoctors, searchDoctors, test, getPatients}

module.exports = {addFamilyMember, viewFamilyMembers, viewDoctors, filterAppointmentsByDateAndStatus,searchByNameSpec, test, getPatients, viewDocInfo, viewPrescriptions, searchBySpecDate, getPatient, filterprescriptionsbydatestatusdoctor}
