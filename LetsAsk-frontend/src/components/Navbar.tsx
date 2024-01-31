import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SearchIcon from '@mui/icons-material/Search';
import { InputGroup } from 'react-bootstrap';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Logout, userData } from '../Helper';
import { Avatar } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login'
import conf from '../conf';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';

const NavBar = () => {
    const navigate = useNavigate()
    const user = userData()
    const avatar = `${conf.apiPrefix}${user.avatar}`

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleProfile = () => {
        setAnchorElUser(null);
        navigate(`/profile`)
    };

    const handleLogout = () => {
        Logout()
        navigate('/')
    }
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
                marginRight: '20px',
                fontWeight: "bold"}}>
                    <AddCircleIcon/>
                    Add Post
                </Button>
                { user.jwt &&
                <>
                 
                    <Button
                    style={{
                    color:'black', 
                    borderRadius: '20px',
                    fontWeight: "bold",
                    fontSize: "16px"}} 
                    onClick={handleOpenUserMenu}>
                    <Avatar
                    alt="Remy Sharp"
                    src={avatar}
                    sx={{ marginRight: "10px"}}
                    />       
                        Profile
                    </Button>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem key="My Profle" onClick={handleProfile}>
                            <Typography textAlign="center" style={{fontWeight: "bold"}}>My Profile</Typography>
                        </MenuItem>
                        <MenuItem key="Logout" onClick={handleLogout}>
                            <Typography textAlign="center" style={{fontWeight: "bold"}}>Logout</Typography>
                        </MenuItem>
                  </Menu>
                </>
                }
                { !user.jwt &&
                    <Button variant="contained" 
                    style={{backgroundColor: '#FFC9C9', 
                    color:'black', 
                    borderRadius: '20px'}} href="/login">
                        <LoginIcon/> 
                        Login / Sign up
                    </Button>        
                }
            </Nav>
        </Container>
        </Navbar>
    );
}

export default NavBar;
