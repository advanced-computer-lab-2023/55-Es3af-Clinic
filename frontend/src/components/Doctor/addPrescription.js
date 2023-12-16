import '../../App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import doctorService from "../../services/doctorService";
import { useParams } from "react-router-dom";
import Home from '../gohome';
//import bcrypt from "bcrypt";


function AddPrescription() {
    const id = useParams().id
    let initialMedicine = {
        name : '',
        dosage : '',
        duration: ''
    };

    const [prescription, setPrescription] = useState([])
    const [medicine, setMedicine] = useState(initialMedicine)
    const [message, setMessage] = useState('You have to click on add prescription to save it')
    const [message2, setMessage2] = useState('')

    const addPrescription = () => {
        if(prescription.length == 0) setMessage2('Prescription is empty')
        else {
            doctorService.addPrescription(prescription, id)
            .then((response) => {setMessage(response.data)})
            .catch((err) => {console.error(err)})
            setPrescription([])
        }
    };

    useEffect(() => {
        //console.log(prescription)
    }, [prescription]);

    const addMedicine = () => {
        if(medicine.name == '' && medicine.dosage == '' && medicine.duration == ''){
            setMessage2('Fields are empty')
        }
        else{
            setMessage2('')
            const updatedPrescription = [...prescription, medicine];
            setPrescription(updatedPrescription);
            setMedicine(initialMedicine)
        }
    }

    const removeMedicine = (index) => {
        const updatedPrescription = prescription.filter((_, i) => i !== index);
        setPrescription(updatedPrescription);
        //console.log(prescription)
    }


    const handleInputChange = (event) => {
        const {name, value} = event.target
        setMedicine({...medicine, [name]: value})
        setMessage('You have to click on add prescription to save it')
    }

    return (
        <div className="App">
          <Home />
        <header className="App-header">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Left side */}
            <div style={{ flex: '0 0 75%', marginRight: '2%' }}>
              <div className="form-group">
              <label htmlFor="Name">Medicine Name</label>
                  <input
                    type="string"
                    className="form-control"
                    id="medicine"
                    name= "name"
                    value={medicine.name}
                    placeholder="Enter Medicine Name"
                    onChange={handleInputChange}
                  ></input>
                  <label htmlFor="Name">Dosage</label>
                  <input
                    type="string"
                    className="form-control"
                    id="dosage"
                    name="dosage"
                    value={medicine.dosage}
                    placeholder="Enter Dosage"
                    onChange={handleInputChange}
                  ></input>
                  <label htmlFor="Name">Duration</label>
                  <input
                    type="string"
                    className="form-control"
                    id="duration"
                    name="duration"
                    value={medicine.duration}
                    placeholder="Enter Duration"
                    onChange={handleInputChange}
                  ></input>
              </div>
              <div>
                <button onClick={addMedicine} className="btn btn-primary">
                  Add Medicine
                </button>

              </div>
              <p style={{ color: 'red' }}>{message2}</p>
              <p style={{ color: 'white' }}>{message}</p>
            </div>
  
            {/* Right side - Displaying medicines list */}
            <div style={{ flex: '0 0 40%' }}>
              <h3>Prescription List</h3>
              <ul>
                {prescription.map((med, index) => (
                  <li key={index}>
                    Name: {med.name} <br/>
                    Dosage: {med.dosage} <br/>
                    Duration: {med.duration} <br/>
                    <button onClick={() => removeMedicine(index)} className="btn-cancel">
                      Remove
                    </button>
                  </li>
                ))}
                <button onClick={addPrescription} className="btn btn-primary">
                  Add Prescription
                </button>
              </ul>
            </div>
          </div>
        </header>
      </div>
    );
}

export default AddPrescription