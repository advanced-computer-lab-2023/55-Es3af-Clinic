
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <a href="/admin" rel="noopener noreferrer">
            <button className="btn btn-primary"> Admin </button>
          </a>
        </div>
        <div>
          <a href="/doctor" rel="noopener noreferrer">
            <button className="btn btn-primary"> Doctor </button>
          </a>
        </div>
        <div>
          <a href="/patient" rel="./components/patient.js">
            <button className="btn btn-primary"> Patient </button>
          </a>
        </div>
        <div>
          <a href="/requestDoctor" rel="noopener noreferrer">
            <button className="btn btn-primary"> Request Doctor </button>
          </a>
        </div>
        <div>
          <a href="/register" rel="noopener noreferrer">
            <button className="btn btn-primary"> Register as Patient </button>
          </a>
        </div>
        <div>
          <a href="/login" rel="noopener noreferrer">
            <button className="btn btn-primary"> Login </button>
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
