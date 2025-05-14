// src/Home/home.js
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConfirmDialog from '../ConfirmDialog'; // ✅ Keep as is

function Home({ setAppData, setFilteredData, filteredData }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    fetch('https://www.voltacores.com/api/getData')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
        setAppData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setLoading(false);
        setError(err);
      });
  }, [setFilteredData, setAppData]);

  const handleButtonClick = (employee) => {
    setSelectedEmployee(employee);
    setShowDialog(true);
  };

  const handleConfirm = (employee) => {
    fetch('https://www.voltacores.com/api/saveWorkerData', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...employee }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to update');
        return res.json();
      })
      .then((updatedEmployee) => {
        const updatedData = data.map((emp) =>
          emp.id === updatedEmployee.id ? updatedEmployee : emp
        );
        setData(updatedData);
        setFilteredData(updatedData);
        setAppData(updatedData);
        setShowDialog(false);
      })
      .catch((err) => console.error('Error:', err));
  };

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Department</th>
            <th>Process Completed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <td>{item.department}</td>
              <td>
                {item.isProcessComplete ? (
                  <span style={{ color: 'green' }}>✅ Completed</span>
                ) : (
                  <span style={{ color: 'red' }}>❌ Pending</span>
                )}
              </td>
              <td>
                <Button
                  variant={item.isProcessComplete ? 'warning' : 'success'}
                  onClick={() => handleButtonClick(item)}
                >
                  {item.isProcessComplete ? 'Withdraw' : 'Re-authorize'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ConfirmDialog
        show={showDialog}
        onHide={() => setShowDialog(false)}
        onConfirm={handleConfirm}
        employee={selectedEmployee}
      />
    </div>
  );
}

export default Home;