import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function Registration() {
  const [employee, setEmployee] = useState({
    id: '',
    firstName: '',
    lastName: '',
    age: '',
    department: '',
    isProcessComplete: false,
  });

  useEffect(() => {
    fetch('https://www.voltacores.com/api/getData')
      .then((res) => res.json())
      .then((data) => {
        const lastId = data[data.length - 1]?.id || 'E0';
        const nextIdNumber = parseInt(lastId.substring(1)) + 1;
        const nextId = `E${nextIdNumber}`;

        setEmployee((prev) => ({
          ...prev,
          id: nextId,
        }));
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted employee:', employee);

     fetch('https://www.voltacores.com/api/insertWorkerData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
        })
        .then((res) => {
            if (!res.ok) throw new Error('Failed to save');
            return res.json();
        })
        .then((data) => {
            console.log('Employee saved successfully:', data);
            alert('Employee registered successfully!');
            setEmployee({
            id: '',
            firstName: '',
            lastName: '',
            age: '',
            department: '',
            isProcessComplete: false,
            });
        })
        .catch((err) => {
            console.error('Error saving employee:', err);
            alert('Failed to register employee.');
        });
  };

  return (
    <Container className="mt-4">
      <h3>Register Employee</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="id" className="mb-3">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={employee.id}
                readOnly
                style={{ backgroundColor: '#e9ecef' }} // greyed out
              />
            </Form.Group>

            <Form.Group controlId="firstName" className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={employee.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="lastName" className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={employee.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="age" className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={employee.age}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="department" className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={employee.department}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Registration;