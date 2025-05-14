// App.js
import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Registration from './Register/Registation';
import Home from './Home/Home';

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchInput2, setSearchInput2] = useState('');

  const handleSearch = () => {
    const filtered = data.filter(item =>
      Object.values(item)
        .join(' ')
        .toLowerCase()
        .includes(searchInput.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleSearch2 = () => {
    if (searchInput2.trim().length === 0) {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item =>
        Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(searchInput2.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <div className="App">
      <Header
        searchInput={searchInput}
        searchInput2={searchInput2}
        setSearchInput={setSearchInput}
        setSearchInput2={setSearchInput2}
        onSearch={handleSearch}
        onType={handleSearch2}
      />

      <br />
      <br />

      <Container className="mt-4">
        <Routes>
          <Route
            path="/react"
            element={
              <Home
                setAppData={setData}
                setFilteredData={setFilteredData}
                filteredData={filteredData}
              />
            }
          />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;