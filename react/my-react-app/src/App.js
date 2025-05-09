import './App.css';
import React,{ useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ConfirmDialog from './ConfirmDialog';
function App() {
   
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchInput2, setSearchInput2] = useState('');

  const [filteredData, setFilteredData] = useState([]);

  const handleButtonClick = (employee) => {
    setSelectedEmployee(employee);
    setShowDialog(true);
  };

  const handleSearch = () => {

    console.log("searching: "+ searchInput)
    const filtered = data.filter(item =>
      Object.values(item)
        .join(' ')
        .toLowerCase()
        .includes(searchInput.toLowerCase())
    );
    setFilteredData(filtered);
  };
  
  const handleSearch2 = () => {
    if(searchInput2.trim(' ').length == 0)
    {
      setFilteredData(data);

    }
    else{
      console.log("searching: "+ searchInput)
      const filtered = data.filter(item =>
        Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(searchInput2.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };
  const handleConfirm = (employee) => {
    fetch('http://localhost:8080/saveWorkerData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...employee }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to update');
          }
          return res.json();
        })
        .then((updatedEmployee) => {
          // Update the specific employee in the list
          const updatedData = data.map((emp) =>
            emp === employee ? updatedEmployee : emp
          );
          setData(updatedData);
          setFilteredData(data);
          setShowDialog(false);
        })
        .catch((err) => {
          console.error('Error:', err);
        });
  }

  useEffect(() => {
    fetch('http://34.170.111.182:8080/getData')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, []);
  
  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="App">
      <Header
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSearchInput2={setSearchInput2}
        onSearch={handleSearch}
        onType={handleSearch2}
      />
    
    <br/>
    <br/>

      <div>
      <Table striped bordered hover>
        <thead className="bg-blue-100">
          <tr>
            <th className="px-6 py-3 font-medium text-gray-700">First Name</th>
            <th className="px-6 py-3 font-medium text-gray-700">Last Name</th>
            <th className="px-6 py-3 font-medium text-gray-700">Age</th>
            <th className="px-6 py-3 font-medium text-gray-700">Departmant</th>
            <th className="px-6 py-3 font-medium text-gray-700">Process Completed</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-6 py-3">{item.firstName}</td>
              <td className="px-6 py-3">{item.lastName}</td>
              <td className="px-6 py-3">{item.age}</td>
              <td className="px-6 py-3">{item.department}</td>
              <td>
        {item.isProcessComplete ? (
          <span style={{ color: 'green' }}>✅ Completed</span>
        ) : (
          <span style={{ color: 'red' }}>❌ Pending</span>
        )}
      </td>
      <td>
        {item.isProcessComplete ? (
          <Button variant= 'warning' onClick={() => handleButtonClick(item)}>Withdraw</Button>
        ) : (
          <Button variant= 'success' onClick={() => handleButtonClick(item)}>Re-authorize</Button>
        )}
      </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
      <ConfirmDialog
        show={showDialog}
        onHide={() => setShowDialog(false)}
        onConfirm={handleConfirm}
        employee={selectedEmployee}
      />
    </div>
  );
}

export default App;
