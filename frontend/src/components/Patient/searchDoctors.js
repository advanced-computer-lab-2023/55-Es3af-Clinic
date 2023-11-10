import { useState } from 'react';
import patientService from '../../services/patientService';

function useDoctorSearch() {
  const [results, setResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const searchDoctors = async (patientid, date, speciality) => {
    try {
      const response = await patientService.FilterDoctors(patientid, date, speciality);
      setResults(response.data);
      setSearchPerformed(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error (e.g., show an error message)
    }
  };

  return { results, searchPerformed, searchDoctors };
}

export default useDoctorSearch;