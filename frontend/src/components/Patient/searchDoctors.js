// Custom hook for search functionality
import { useState } from 'react';
import patientService from '../../services/patientService';

function useDoctorSearch() {
  const [results, setResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const searchDoctors = async (patientid, date, speciality) => {
      const response = await patientService.useDoctorSearch(patientid, date, speciality);

      setResults(response.data);
      setSearchPerformed(true);


  };

  return { results, searchPerformed, searchDoctors };
}

export default useDoctorSearch;
