# 55-Es3af-Clinic
Virtual Clinic:

Project Title:
55Es3af - Virtual Clinic

Motivation: 

A virtual clinic that simplifies the patient-doctor interaction is introduced in 55Es3af. This program makes it easier for patients to find and book medical appointments, which streamlines interactions in the healthcare system. Choosing between in-person or virtual consultations, the platform guarantees a smooth and safe communication path. Features like medication reminders, easy access to whole medical histories, and effective follow-up protocols are helpful to patients. A highly sophisticated and user-friendly solution, 55Es3af is intended to optimise the way healthcare is accessible and provided while also improving the entire patient journey.


Build Status:

UI Status:* The user interface (UI) is currently under development and may not reflect the final design or functionality. Expect ongoing updates and improvements.*












Code Style: 

The codebase maintains a consistent style and structure across various aspects, enhancing readability and maintainability. Variable names adhere to the camelCase convention, ensuring uniformity throughout. Descriptive names for functions and variables contribute to the code's readability, making it easier to understand their purposes.
Asynchronous operations are efficiently managed using Async/Await, especially in scenarios involving database interactions or external services. Promises are also employed for handling asynchronous tasks, typically within try/catch blocks for error handling within async functions.
Error handling is structured around try/catch blocks, ensuring that errors in asynchronous operations are effectively captured and managed. Responses to different scenarios—be it success, failure, or errors—are consistently formatted in JSON, accompanied by relevant HTTP status codes such as 200 OK or 400 Bad Request, providing clear feedback to consumers of the API.
Endpoints are logically structured, following the HTTP methods and routes pattern (e.g., POST /admins, GET /admins/users), aligning with RESTful conventions. HTTP status codes are appropriately used to communicate the outcome of the request/response cycle, aiding in understanding the result of each interaction.
The codebase integrates middleware functions, such as those handling authentication using JWT tokens, seamlessly into the Express.js framework. These mechanisms indicate a focus on security, ensuring that requests are authenticated before processing, enhancing the overall robustness of the application.










Screenshots: Pictures of how the system looks
![WhatsApp Image 2023-12-17 at 05 30 01_1c9b4f99](https://github.com/advanced-computer-lab-2023/55-Es3af-Clinic/assets/118920464/5210acf8-a2bc-4aa3-a0c4-6b9d92e3b86b)
![WhatsApp Image 2023-12-17 at 05 30 30_b5ae5de7](https://github.com/advanced-computer-lab-2023/55-Es3af-Clinic/assets/118920464/7a536ac1-c8e4-46e6-965a-dc76f77b2672)
![WhatsApp Image 2023-12-17 at 05 31 38_1d5ca324](https://github.com/advanced-computer-lab-2023/55-Es3af-Clinic/assets/118920464/a9782984-8722-4da9-bf22-0d0f54e1befc)
![WhatsApp Image 2023-12-17 at 05 34 09_9cc29700](https://github.com/advanced-computer-lab-2023/55-Es3af-Clinic/assets/118920464/d81729af-eb53-4f97-bb70-e3962e38c44e)
![WhatsApp Image 2023-12-17 at 05 23 04_2886dce5](https://github.com/advanced-computer-lab-2023/55-Es3af-Clinic/assets/118920464/726b10c9-d19f-4b17-b73a-07efb1931eb9)



tech/framework used: // Add any more i have missed copy paste for pharmacy// (2marks)
React
Node.js
Express
MongoDB
Mongoose
Stripe
Typescript
Git
Github Actions
MongoDB Atlas
Postman
VSCode
Socket.io
Nodemailer











Features:

The system serves different type of users (Admin,Doctor or Patient)

Admin Features:
As an admin, I can Add Admin:
Add a new admin user to the system.
As an admin, I can List Users:
Retrieve a list of all users in the system.
As an admin, I can Delete User:
Delete a user from the system by ID.
As an admin, I can View Doctor Data:
Retrieve data of doctor requests.
As an admin, I can Accept Doctor Request:
Accept a doctor request and add the doctor to the system.
As an admin, I can Reject Doctor Request:
Reject a doctor request from being added to the system.
1. Add Admin
Description: Adds a new admin user to the system.
Endpoint: POST /admins
Request:
username: Admin username
password: Admin password
Response:
200 OK: Returns the newly created admin object.
400 Bad Request: Error response if the request is invalid.
2. List Users
Description: Retrieves a list of all users in the system.
Endpoint: GET /admins/users
Response:
200 OK: Returns an array of user objects.
400 Bad Request: Error response if retrieval fails.
3. Delete User
Description: Deletes a user from the system by ID.
Endpoint: DELETE /admins/users/:id
Response:
204 No Content: Successful deletion of the user.
404 Not Found: Error response if the user ID does not exist.
500 Internal Server Error: Error response if there's a server issue.
4. View Doctor Data
Description: Retrieves data of doctor requests.
Endpoint: GET /admins/doctors/requests
Response:
200 OK: Returns an array of doctor request objects.
400 Bad Request: Error response if retrieval fails.
5. Accept Doctor Request
Description: Accepts a doctor request and adds the doctor to the system.
Endpoint: POST /admins/doctors/requests/:id/accept
Response:
200 OK: Successful acceptance of the doctor request.
404 Not Found: Error response if the request ID doesn't exist.
500 Internal Server Error: Error response for server-related issues.
6. Reject Doctor Request
Description: Rejects a doctor request from being added to the system.
Endpoint: DELETE /admins/doctors/requests/:id/reject
Response:
200 OK: Successful rejection of the doctor request.
500 Internal Server Error: Error response for server-related issues.



Doctor Features:
addDoctor: Creates a new doctor in the system.
getAllPatients: Retrieves a list of all patients in the system.
getAllDoctors: Fetches a list of all doctors in the system.
createHealthRecords: Creates health records for patients.
createAppointment: Creates an appointment for a patient.
updateDoctor: Updates doctor information.
viewHealthRecords: Retrieves health records for a patient.
searchPatientByName: Searches for patients by name.
getAllMyPatients: Fetches all patients assigned to a specific doctor.
filterAppointmentsByDateAndStatus: Filters appointments based on date and status.
filterPatientsByUpcomingPendingAppointments: Filters patients based on upcoming and pending appointments.
selectPatient: Assigns a patient to a doctor.
getAmountInWallet: Retrieves the amount in a doctor's wallet.
getTimeSlots: Retrieves available time slots for a doctor.
addTimeSlots: Adds new time slots for a doctor.
uploadPatientHealthRec: Uploads a patient's health records.
scheduleFollowUpAppointment: Schedules a follow-up appointment.
getAppointmentsWithStatusDone: Fetches appointments with a "done" status.
addPrescription: Adds a prescription for a patient.
cancelAppointment: Cancels an appointment and manages notifications and refunds.
acceptOrRevokeFollowUp: Handles accepting or rejecting follow-up requests.
getAllPrescriptions: Fetches all prescriptions associated with a doctor.
editDosage: Edits the dosage of a prescribed medicine.
updatePatientPrescription: Updates a patient's prescription.
rescheduleAnAppointment: Reschedules an appointment and handles notifications.
As a doctor, I can:
Add a Doctor: Register a new doctor in the system.
View All Patients: Access a list of all patients in the system.
View All Doctors: Fetch a comprehensive list of all doctors.
Create Health Records: Generate and maintain health records for patients.
Create Appointments: Schedule appointments for patients.
Update My Profile: Modify and update personal information and credentials.
View Health Records: Access and review the health records of patients.
Search Patients by Name: Find patients by their names.
View My Assigned Patients: See a list of patients assigned specifically to me.
Filter Appointments by Date and Status: Sort appointments based on date and status.
Filter Patients by Upcoming/Pending Appointments: Sort patients based on their upcoming or pending appointments.
Select a Patient: Assign myself as the attending doctor for a patient.
Check Wallet Balance: View the current balance in my wallet.
View Available Time Slots: Access my available time slots for appointments.
Add Time Slots: Create and add new available time slots.
Upload Patient Health Records: Upload and attach health records for a patient.
Schedule Follow-Up Appointments: Arrange follow-up appointments for patients.
View Appointments with "Done" Status: Access appointments that have been marked as "done".
Add Prescriptions: Create and add prescriptions for patients.
Cancel Appointments: Cancel appointments and manage associated notifications and refunds.
Accept/Reject Follow-Up Requests: Approve or decline follow-up requests from patients.
View All Prescriptions: Access all prescriptions linked to my profile.
Edit Dosages in Prescriptions: Modify dosages within existing prescriptions.
Update Patient Prescriptions: Modify and update prescriptions for patients.
Reschedule Appointments: Change appointment timings and manage notifications accordingly.
Patient Features
  addFamilyMember: Adds a family member to patient
  viewFamilyMembers: Views all family members of patient
  viewDoctors: Views all the doctors in the clinic
  filterAppointmentsByDateAndStatus: Filters all patient’s appointments by date and status
  searchByNameSpec: Search doctors by name and/or speciality
  getPatients: Gets all patients
viewDocInfo: View detailed information about a doctor.
viewPrescriptions: Access and view prescribed medications.
searchBySpecDate: Search for doctors based on specialty and date.
getPatient: Retrieve patient details and information.
filterPrescriptionsByDateStatusDoctor: Filter prescriptions based on date, status, or doctor.
addFamilyMemberByUsername: Add a family member using their username.
getAmountInWallet: Check the current amount in the patient's wallet.
subscribeToAHealthPackage: Subscribe in a health package.
withdrawFromWallet: Withdraw funds from the patient's wallet.
appointmentsForDoc: Retrieve available appointments for a specific doctor.
BookAnAppointment: Schedule and book an appointment with a doctor.
uploadMedicalHistory: Upload medical history records.
viewSubscribedHealthPackages: View the subscribed health packages.
checkoutSession: Proceed to the checkout session for payments.
viewPatientAppointments: Access and view all patient appointments.
cancelHealthPackageSubscription: Cancel an ongoing health package subscription.
viewAvailableAppointments: View available appointment slots.
viewMedicalHistory: Access and view the patient's medical history.
removeMedicalHistory: Remove or delete medical history records.
requestFollowUp: Request a follow-up appointment.
viewFamilyAppointments: View appointments for family members.
cancelAppointment: Cancel an existing appointment.
viewPrescriptionDetails: View detailed information about a prescription.
getAllPrescriptionsForPatient: Fetch all prescriptions associated with the patient.
payForPrescripFromWallet: Make a payment for a prescription using the wallet.
rescheduleAnAppointment: Change the timing of an existing appointment.
payForPrescripFromCredit: Payment for a prescription using credit or debit.

As a patient I want:
To add a family member to me
View all my family members
View all doctors
Filter my appointments by date and status
Search for a doctor by their name and speciality
Access detailed information about doctors
Schedule appointments with preferred doctors on available time slots
Access and review prescriptions provided by doctors, including medication details, and dosage
Review and manage personal medical history records
Cancel scheduled appointments
See available time slots for different doctors to plan and book appointments conveniently.
Request follow-up appointments to continue treatment or discuss progress with doctors.
Access details of enrolled subscription plans
Upload medical history records for doctors to access relevant information for better treatment.
Access and view appointments of associated family members
Apply filters to prescriptions based on date, status (e.g., filled, unfilled), or the prescribing doctor for easier management.
Include family members using their usernames 
Check the available balance in the wallet 
Subscribe to health packages offered by the clinic
Ability to withdraw funds or credits from the wallet as needed for various purposes.
Access and review the scheduled appointments
Cancel a previously subscribed health package 
Delete specific medical history 
Review detailed information and specifics of prescribed medications or treatments.
Complete payment for prescribed medications using the available wallet balance.
Reschedule the timing or date of an appointment 
Complete payment for prescribed medications using a credit 
Search for a doctor by their speciality and available time slots
View all my prescriptions
Patient Management:
getPatient: Retrieve patient information based on token from cookies.
getPatients: Retrieve all patients' information from the database.
addFamilyMemberByUsername: Add a family member to the patient's account using their email or mobile number.
addFamilyMember: Directly add a family member to the patient's account by providing details.
viewFamilyMembers: Retrieve a list of family members associated with a patient.
withdrawFromWallet: Allow a patient to withdraw funds from their wallet.
Health Package Subscription:
subscribeToAHealthPackage: Enable patients to subscribe to health packages with renewal dates.
viewSubscribedHealthPackages: Retrieve information about health packages subscribed to by patients and their family members.
Appointments and Doctor Information:
viewDoctors: Retrieve a list of available doctors.
viewDoctorDetails: Display detailed information about a specific doctor.
searchByNameSpec: Search for doctors by name and specialty.
searchBySpecDate: Filter available doctors by specialty and date.
viewDocInfo: Retrieve details about a specific doctor.
Prescriptions and Appointments:
viewPrescriptions: Display prescriptions associated with a patient.
filterPrescriptionsByDateStatusDoctor: Filter prescriptions by date, status, and doctor.
filterAppointmentsByDateAndStatus: Filter appointments by date and status.
rescheduleAnAppointment: Facilitate patients to reschedule existing appointments.
payForPrescriptionFromWallet: Allow patients to pay for prescriptions using their wallet balance.
Wallet Management:
getAmountInWallet: Retrieve the current amount in a patient's wallet.
withdrawFromWallet: Allow patients to withdraw funds from their wallet.
Booking and Appointment Management:
bookAnAppointment: Enable patients to book appointments with available doctors.
requestFollowUp: Allow patients to request follow-up appointments.
viewAvailableAppointments: Enable patients to view available time slots for specific doctors.
Medical History Management:
uploadMedicalHistory: Allow patients to upload medical history files.
viewMedicalHistory: Allow patients to view their uploaded medical history files.
removeMedicalHistory: Enable patients to delete specific medical history files.
viewFamilyAppointments: Show appointments for the patient and their family members.
viewPatientAppointments: Display appointments specifically for the logged-in patient.
viewSubscribedHealthPackages: Display subscribed health packages for the patient and their family members.
Patient Features
Patient Management:
As a patient, I can: Retrieve my information based on my token from cookies.
As a patient, I can: View details of all patients in the database.
As a patient, I can: Add a family member to my account using their email or mobile number.
As a patient, I can: Add a family member directly to my account by providing their details.
As a patient, I can: See a list of my associated family members.
As a patient, I can: Withdraw funds from my wallet.
Health Package Subscription:
As a patient, I can: Subscribe to health packages with renewal dates.
As a patient, I can: View information about subscribed health packages.
Appointments and Doctor Information:
As a patient, I can: View a list of available doctors.
As a patient, I can: Access detailed information about a specific doctor.
As a patient, I can: Search for doctors by their name and specialty.
As a patient, I can: Filter available doctors by specialty and date.
As a patient, I can: Retrieve details about a specific doctor.
Prescriptions and Appointments:
As a patient, I can: View prescriptions associated with me.
As a patient, I can: Filter prescriptions by date, status, and doctor.
As a patient, I can: Reschedule my existing appointments.
As a patient, I can: Pay for prescriptions using my wallet balance.
Wallet Management:
As a patient, I can: Check the current amount in my wallet.
As a patient, I can: Withdraw funds from my wallet.
Booking and Appointment Management:
As a patient, I can: Book appointments with available doctors.
As a patient, I can: Request follow-up appointments.
As a patient, I can: View available time slots for specific doctors.
Medical History Management:
As a patient, I can: Upload my medical history files.
As a patient, I can: View my uploaded medical history files.
As a patient, I can: Remove specific medical history files.
As a patient, I can: View appointments for me and my family members.
As a patient, I can: View subscribed health packages for me and my family.

Code examples: 
![WhatsApp Image 2023-12-17 at 05 49 50_be96474b](https://github.com/advanced-computer-lab-2023/55-Es3af-Clinic/assets/118920464/afc40cc7-0a81-4d36-b008-1a5cbbadb773)
![WhatsApp Image 2023-12-17 at 05 50 44_061be18c](https://github.com/advanced-computer-lab-2023/55-Es3af-Clinic/assets/118920464/8569b73a-be03-4768-a875-623d1cab2ff0)
![WhatsApp Image 2023-12-17 at 05 48 50_eefbd4b5](https://github.com/advanced-computer-lab-2023/55-Es3af-Clinic/assets/118920464/de141e91-925e-4190-b2da-7914f94d3354)










Installation (2marks)

you can install the project using git clone ‘https://github.com/advanced-computer-lab-2023/55-Es3af-Clinic.git’ then Navigate to the backend directory and install dependencies by opening the terminal and entering these commands:
cd 55-Es3af-Clinic
cd src
then run npm install to download all the needed packages using npm install : packages :
node js
express js
mongoose
react
bcrypt
cookie-parser
dotenv
jsonwebtoken
nodemon
stripe
nodemailer
axios
Bootstrap
Other backend-specific packages
Then, Navigate to the frontend directory by opening a new terminal and entering these commands : 
cd 55-Es3af-Clinic
cd frontend  
and install dependencies:
react
axios
bootstrap
@mui/icons-material
Other frontend-specific packages
After cloning the project or downloading the ZIP folder open the project using the integrated terminal or by using the CMD then run the frontend / backend servers
In the backend terminal: ” node test.js” to run the backend server on port :8000
In the frontend terminal: “npm run start” to run the frontend server on port :3000



API References 

adminRoutes.put("/updatePassword",userController.changePassword);
adminRoutes.post("/addAdmin", adminController.addAdmin);
adminRoutes.post("/createUser", userController.createUser);
adminRoutes.get("/listUsers", adminController.listUsers);
adminRoutes.delete("/deleteUser/:id", adminController.deleteUser);
adminRoutes.get("/viewDoctorData", adminController.viewDoctorData);
adminRoutes.put("/acceptDoctorRequest/:id", adminController.acceptDoctorRequest);
adminRoutes.put("/rejectDoctorRequest/:id", adminController.rejectDoctorRequest);
contractRoutes.get("/doctor/",contractController.viewEmploymentContract)
contractRoutes.post("/", contractController.createContract);
contractRoutes.put("/:contractId", contractController.updateContract);
contractRoutes.delete("/:contractId", contractController.deleteContract);
contractRoutes.get("/:contractId", contractController.getContractById);
doctorRouter.post('/addPrescription/:id',doctorController.addPrescription)
doctorRouter.post("/addDoctor", doctorController.addDoctor);
doctorRouter.put('/updatePassword', userController.changePassword)
doctorRouter.route('/getAllPrescriptions').get(doctorController.getAllPrescriptions);
doctorRouter.get('/notifi', userController.getNotifications)
doctorRouter.route("/scheduleFollowUpAppointment").post(doctorController.scheduleFollowUpAppointment);
doctorRouter.route("/updateDoctor").put(doctorController.updateDoctor);
doctorRouter.route("/getPatients").get(doctorController.getAllPatients);
doctorRouter.route("/getAllDoctors").get(doctorController.getAllDoctors);
doctorRouter
  .route("/createHealthRecords")
  .post(doctorController.createHealthRecords);
doctorRouter
  .route("/createAppointment")
  .post(doctorController.createAppointment);
doctorRouter
  .route("/viewHealthRecords/:patientId")
  .get(doctorController.viewHealthRecords);
doctorRouter
  .route("/searchPatientByName")
  .get(doctorController.searchPatientByName);
doctorRouter.route("/getAllMyPatients").get(doctorController.getAllMyPatients);
doctorRouter
  .route("/filterAppointmentsByDateAndStatus")
  .get(doctorController.filterAppointmentsByDateAndStatus);
doctorRouter
  .route("/filterPatientsByUpcomingPendingAppointments")  .get(doctorController.filterPatientsByUpcomingPendingAppointments);
doctorRouter.route("/selectPatient").patch(doctorController.selectPatient);
doctorRouter.route("/getAmountInWallet").get(doctorController.getAmountInWallet);
doctorRouter.route("/getTimeSlots").get(doctorController.getTimeSlots);
doctorRouter.route("/addTimeSlots").post(doctorController.addTimeSlots);
doctorRouter.route("/uploadHealthRec").post(doctorController.uploadPatientHealthRec);
doctorRouter.route('/getAppointmentsWithStatusDone').get(doctorController.getAppointmentsWithStatusDone);
doctorRouter.route('/cancelAppointment').put(doctorController.cancelAppointment);
doctorRouter.put('/acceptOrRevokeFollowUp', doctorController.acceptOrRevokeFollowUp);
doctorRouter.route('/editDosage').put(doctorController.editDosage);
doctorRouter.route('/updatePatientPrescription/:id').put(doctorController.updatePatientPrescription);
doctorRouter.route('/rescheduleAnAppointment').put(doctorController.rescheduleAnAppointment);
router.use("/patient", patientRoutes);
router.use("/doctor", doctorRouter);
router.use("/contract", contractRoutes);
router.use("/requestDoctor", requestDoctorRoutes);
router.use("/register", registerPatientRoutes);
router.use("/admin", adminRoutes);
router.use("/packages", packageRoutes);
router.get("/logout", userController.logout);
router.post("/forgetPassword", userController.forgetPassword);
router.put("/resetPassword/:id", userController.resetPassword);
router.get("/profile", userController.getProfile);
packageRoutes.post("/createPackage", packageController.createPackage);
packageRoutes.put("/updatePackage", packageController.updatePackage);
packageRoutes.delete("/deletePackage/:id", packageController.deletePackage);
packageRoutes.get("/", packageController.viewPackages);
patientRoutes.get( "/viewAvailableAppointments/:id", patientController.viewAvailableAppointments);
patientRoutes.get("/notifi", userController.getNotifications);
patientRoutes.get("/getAmountInWallet", patientController.getAmountInWallet);
patientRoutes.post("/createSession", patientController.checkoutSession);
patientRoutes.put("/updatePassword", userController.changePassword);
patientRoutes.get("/searchBySpecDate", patientController.searchBySpecDate);
patientRoutes.put("/withdrawFromWallet", patientController.withdrawFromWallet);
patientRoutes.post(  "/addFamilyMemberByAcc",  patientController.addFamilyMemberByUsername);
patientRoutes.get("/search", patientController.searchByNameSpec);
patientRoutes.get("/familyMembers", patientController.viewFamilyMembers);
patientRoutes.get("/viewDoctors", patientController.viewDoctors);
patientRoutes.get("/getPatient", patientController.getPatient);
patientRoutes.post("/addFamilyMember", patientController.addFamilyMember);
patientRoutes.get("/doctorInfo/:id", patientController.viewDocInfo);
patientRoutes.get("/viewPrescriptions", patientController.viewPrescriptions);
patientRoutes.put("/subscribeToAHealthPackage", patientController.subscribeToAHealthPackage);
patientRoutes.get(  "/filterprescriptionsbydatestatusdoctor",  patientController.filterprescriptionsbydatestatusdoctor);
patientRoutes.get( "/filterAppointmentsByDateAndStatus", patientController.filterAppointmentsByDateAndStatus);
patientRoutes.get(  "/viewPatientAppointments",  patientController.viewPatientAppointments);
patientRoutes.get( "/viewFamilyMembersAppointments", patientController.viewFamilyAppointments);
patientRoutes.post("/requestFollowUp", patientController.requestFollowUp);
patientRoutes.post( "/uploadMedicalHistory", patientController.uploadMedicalHistory);
patientRoutes.post("/BookAnAppointment", patientController.BookAnAppointment);
patientRoutes.get( "/viewSubscribedHealthPackages", patientController.viewSubscribedHealthPackages);
patientRoutes.put(  "/cancelHealthPackageSubscription",  patientController.cancelHealthPackageSubscription);
patientRoutes.get("/viewMedicalHistory", patientController.viewMedicalHistory);
patientRoutes.delete(  "/removeMedicalHistory/:medicalHistoryId",  patientController.removeMedicalHistory);
patientRoutes.put("/cancelAppointment", patientController.cancelAppointment);
patientRoutes.get(  "/viewPrescriptionDetails/:prescriptionId",  patientController.viewPrescriptionDetails);
patientRoutes.put("/rescheduleAnAppointment",
 patientController.rescheduleAnAppointment);
patientRoutes.patch( "/payUsingWallet/:prescriptionID", patientController.payForPrescripFromWallet);
registerPatientRoutes.post('/',RegisterPatientController.registerPatient)
requestDoctorRoutes.post('/', upload.fields([{ name: 'IDdoc', maxCount: 1 },{ name: 'MedicalLicenses', maxCount: 10 },{ name: 'MedicalDegree', maxCount: 1 },]),RequestDoctorController.requestDoctor);






Tests

The api routes were tested using postman , Postman is an application used for API testing. It is an HTTP client that tests HTTP requests, utilizing a graphical user interface, through which we obtain different types of responses that need to be subsequently validated. Postman offers many endpoint interaction methods. The following are some of the most used, including their functions:
GET: Obtain information
POST: Add information
PUT: Replace information
PATCH: Update certain information
DELETE: Delete information
![WhatsApp Image 2023-12-17 at 05 23 59_d80d9694](https://github.com/advanced-computer-lab-2023/55-Es3af-Clinic/assets/118920464/986a8054-a7e1-4706-bf73-f4cce8954b0d)
![WhatsApp Image 2023-12-17 at 05 23 46_38185a29](https://github.com/advanced-computer-lab-2023/55-Es3af-Clinic/assets/118920464/a5f9747b-e818-4fe4-abb5-3cb1439946e4)



How to Use (2 marks) // Check The Reference Document Above// 

Create a New Request: Click on the "New" button and select "Request" to create a new API request. Give your request a name for easy reference.

Choose HTTP Method: Select the appropriate HTTP method for your API (GET, POST, PUT, DELETE, etc.) from the dropdown menu.

Enter Request URL: In the URL field, input the endpoint URL you want to test. For instance, https://api.example.com/users.

Add Headers (if needed): If your API requires headers (such as authentication tokens or content type), you can add them by clicking on the "Headers" tab and specifying the key-value pairs.

Input Request Body (if needed): For requests that require a body (like POST or PUT), switch to the "Body" tab, choose the appropriate format (JSON, form-data, etc.), and enter the request payload.

Send the Request: Click on the "Send" button to execute the API request. You'll receive a response in the right-hand pane, displaying details like status code, headers, and the response body.

Inspect and Validate the Response: Check the response body and status code to ensure the API is working as expected. You can also view response time, cookies, and other details.

Save and Organize Requests: Save your requests for future use by clicking the "Save" button. Organize them into collections to group related requests.

Test Automation (optional): Postman allows for setting up automated tests. You can write test scripts to check if the API responses meet certain criteria, ensuring the API's functionality.

Documentation and Sharing: Postman provides the ability to generate documentation for your APIs, making it easier to share API collections with team members or other stakeholders.


Contribute (1 marks)  Writing that the project is perfect is not acceptable 

The project is currently under development and there are some styling problems to be fixed.
Credits

https://www.udemy.com/share/101Wv63@NkAA8Xr2469JcrSs1ADFQkQlyuIQYTK0pV92Y9jpo1J4w7TZZNSf2er6WlIOPxojWw==/
https://discord.gg/NDxf3hWC
https://chat.openai.com/





License (2marks)  for example: If Stripe is used, Apache 2.0 license Must be includeed in this section

This project is licenced under Apache Licence 2.0

