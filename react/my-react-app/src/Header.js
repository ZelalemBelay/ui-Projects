import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';

function Header({ searchInput, searchInput2, setSearchInput, setSearchInput2, onSearch, onType }) {

    const submitSearch = (e) => {
        e.preventDefault();
        onSearch(); // triggers search action in App
      };

    const submitSearchOnType = (e) => {
        const value = e.target.value;
        setSearchInput2(value);
        onType(value); // Trigger search immediately// triggers search action in App
      };
  return (
    <>
      <Navbar expand="lg" bg='dark' data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/react">Zeelo React page</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/react">Home</Nav.Link>
            <Nav.Link href="https://voltacores.com/">^Angular-APP</Nav.Link>
            <NavDropdown title="መመዝገቢያ ቦታ" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Otehr Pages</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/register">
                Register
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                ሌላ ድሮፕዳውን አይተም
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form >
        <InputGroup>
          <InputGroup.Text id="basic-addon1">        Search while typing: </InputGroup.Text>

          <Form.Control
            placeholder="አስገባ"
            type='search'
            aria-label="searchf"
            value={searchInput2}
            aria-describedby="basic-addon1"
            onChange={submitSearchOnType}
          />
        </InputGroup>
      </Form>
          <Form onSubmit={submitSearch} className="d-flex">
            <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                />
            <Button type="submit" variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default Header;