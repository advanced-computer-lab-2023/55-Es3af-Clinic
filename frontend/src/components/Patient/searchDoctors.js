// // Custom hook for search functionality
// import { useState } from 'react';
// import patientService from '../../services/patientService';


// function UseDoctorSearch() {
//   const [results, setResults] = useState([]);
//   const [searchPerformed, setSearchPerformed] = useState(false);
//   //const [specs, setSpecs] = useState([])

//   //setSpecs = patientService.getAllSpecialities()

//   const searchDoctors = async (date, speciality) => {
//       const response = await patientService.useDoctorSearch(date, speciality);

//       setResults(response.data);
//       setSearchPerformed(true);
//   };

//   return { results, searchPerformed, searchDoctors };
// }

// export default UseDoctorSearch;
