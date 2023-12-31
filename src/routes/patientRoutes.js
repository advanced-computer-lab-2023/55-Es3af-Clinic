const Router = require("express");
const patientController = require("../controllers/PatientController");
const userController = require("../controllers/UserController");

const patientRoutes = new Router();
patientRoutes.get(
  "/viewAvailableAppointments/:id",
  patientController.viewAvailableAppointments
);
patientRoutes.get("/notifi", userController.getNotifications);
patientRoutes.get("/getAmountInWallet", patientController.getAmountInWallet);
patientRoutes.post("/createSession", patientController.checkoutSession);
patientRoutes.put("/updatePassword", userController.changePassword);
patientRoutes.get("/searchBySpecDate", patientController.searchBySpecDate);
patientRoutes.put("/withdrawFromWallet", patientController.withdrawFromWallet);
patientRoutes.post(
  "/addFamilyMemberByAcc",
  patientController.addFamilyMemberByUsername
);
//patientRoutes.get('/:id/updatePassword', patientController.getPassword)
patientRoutes.get("/search", patientController.searchByNameSpec);
patientRoutes.get("/familyMembers", patientController.viewFamilyMembers);
patientRoutes.get("/viewDoctors", patientController.viewDoctors);
patientRoutes.get("/getPatient", patientController.getPatient);
patientRoutes.post("/addFamilyMember", patientController.addFamilyMember);
patientRoutes.get("/doctorInfo/:id", patientController.viewDocInfo);
patientRoutes.get("/viewPrescriptions", patientController.viewPrescriptions);
patientRoutes.put(
  "/subscribeToAHealthPackage",
  patientController.subscribeToAHealthPackage
);
patientRoutes.get(
  "/filterprescriptionsbydatestatusdoctor",
  patientController.filterprescriptionsbydatestatusdoctor
);
patientRoutes.get(
  "/filterAppointmentsByDateAndStatus",
  patientController.filterAppointmentsByDateAndStatus
);
//patientRoutes.get("/viewAvailableAppoinments/:id", patientController.viewAvailableAppointments);
//patientRoutes.get('/', patientController.getAllSpecialities)
patientRoutes.get(
  "/viewPatientAppointments",
  patientController.viewPatientAppointments
);
patientRoutes.get(
  "/viewFamilyMembersAppointments",
  patientController.viewFamilyAppointments
);
patientRoutes.post("/requestFollowUp", patientController.requestFollowUp);
patientRoutes.post(
  "/uploadMedicalHistory",
  patientController.uploadMedicalHistory
);
patientRoutes.post("/BookAnAppointment", patientController.BookAnAppointment);
patientRoutes.get(
  "/viewSubscribedHealthPackages",
  patientController.viewSubscribedHealthPackages
);
patientRoutes.put(
  "/cancelHealthPackageSubscription",
  patientController.cancelHealthPackageSubscription
);
patientRoutes.get("/viewMedicalHistory", patientController.viewMedicalHistory);
patientRoutes.delete(
  "/removeMedicalHistory/:medicalHistoryId",
  patientController.removeMedicalHistory
);
patientRoutes.put("/cancelAppointment", patientController.cancelAppointment);
patientRoutes.get(
  "/viewPrescriptionDetails/:prescriptionId",
  patientController.viewPrescriptionDetails
);
patientRoutes.put(
  "/rescheduleAnAppointment",
  patientController.rescheduleAnAppointment
);
patientRoutes.patch(
  "/payUsingWallet/:prescriptionID",
  patientController.payForPrescripFromWallet
);
patientRoutes.post("/payForPres", patientController.payForPrescripFromCredit);
patientRoutes.get("/getName/:doctorID", patientController.getName);

//patientRoutes.get('/viewPrescriptions', patientController.getAllPrescriptionsForPatient);
module.exports = { patientRoutes };
