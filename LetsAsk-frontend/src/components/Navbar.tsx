import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SearchIcon from '@mui/icons-material/Search';
import { InputGroup } from 'react-bootstrap';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LoginIcon from '@mui/icons-material/Login';


const NavBar = () => {
  return (
    <Navbar expand="lg" style={{ backgroundColor: '#B30006' }}>
    <Container fluid>
        <Navbar.Brand href="/">
        <img
            alt=""
            src="/logo.png"
            width="100"
            height="40"
            style={{marginLeft: "10%"}}
            className="d-inline-block align-top"
        />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Form className="d-flex">
            <InputGroup style={{backgroundColor: "white",  border: '2px solid black', borderRadius: '20px'}}>
                <Form.Control
                type="search"
                placeholder="Search for interesting topics or tag"
                className="me-2"
                aria-label="Search"
                style={{ marginLeft: 'auto', width: 600, borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px'}}
                />
                <InputGroup.Text style={{borderTopRightRadius: '20px', borderBottomRightRadius: '20px', backgroundColor:'white'}}><SearchIcon/></InputGroup.Text>
            </InputGroup>
        </Form>
        <Nav className="justify-content-end">            
            <Button variant="contained" 
            style={{backgroundColor: '#FFC9C9', 
            color:'black', 
            borderRadius: '20px',
            marginRight: '5px'}}>
                <AddCircleIcon/>
                Add Post
            </Button>
            
            <Button variant="contained" 
            style={{backgroundColor: '#FFC9C9', 
            color:'black', 
            borderRadius: '20px'}} href="/login">
                <LoginIcon/> 
                Login / Sign up
            </Button>
        </Nav>
    </Container>
    </Navbar>
  );
}

export default NavBar;
