import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import conf from '../conf';
import axios from 'axios';
import { storeUser, userData } from '../Helper';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const initialUser = { identifier: '', password: ''}

const Login = () => {
    const [user, setUser] = useState(initialUser);
    const [checked, setChecked] = React.useState(true);
    const navigate = useNavigate()

    const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setChecked(event.target.checked);
      };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = event.target;
      setUser({
        ...user,
          [name]: value,
      })
      console.log(user.identifier, user.password)
    }

    const handlelogin = async (event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {      
      const url = `${conf.apiPrefix}/api/auth/local`
      event.preventDefault();
      if (event.type === 'submit') {
        event.preventDefault(); // Prevent the default form submission behavior
      }
      try {
        if (user.identifier && user.password) {
          const {data} = await axios.post(url, user)
          if (data.jwt) {
            storeUser(data)

            toast.success('Login successful')

            setUser(initialUser)
            setTimeout(() => {
              setUser(initialUser);
              navigate('/');
            }, 2000);
          }
      }}catch(err) {
          toast.error("Invalid email or password", {
          })
        }
      }
    
    useEffect(() => {
      const data = userData();
      try {
        if(data.jwt) {
          navigate('/')
        }
      } catch {
        navigate('/login')
      }
    },[])


    return (
      <div className="container mt-6" style={{color: 'white', padding: '20px' }}>
        <h2 className="text-center">Login</h2>
        <h6 className="text-center">Enter your google account  details to continue</h6>
        <Form>
          <div className="d-flex justify-content-center">
          <Form.Group controlId="formBasicEmail" className="mt-5" >
            <Form.Label>Enter your google email</Form.Label>
            <Form.Control 
              style={{backgroundColor: '#5B5B5B',borderRadius: '20px' , width: '593px', height: '56px', color: 'white'}} 
              type="email" 
              name = "identifier"
              placeholder="Enter email"
              onChange={handleChange}
            />
          </Form.Group>
          </div>

          <div className="d-flex justify-content-center">
          <Form.Group controlId="formBasicPassword" className="mt-3">
            <Form.Label>Enter your google password</Form.Label>
            <Form.Control  
              style={{backgroundColor: '#5B5B5B',borderRadius: '20px' , width: '593px', height: '56px', color: 'white'}} 
              type="password"
              name = "password" 
              placeholder="Password"
              onChange={handleChange} 
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <Form.Text style={{ color: 'white' }}>
                  <a href="/recovery" style={{ color: 'white', textDecoration: 'underline' }}>Recovery google password</a>
              </Form.Text>
            </div>
          </Form.Group>
          </div>

          <div className="d-flex justify-content-center">
              <FormControlLabel
                  className='mt-3'
                  control={<Checkbox checked={checked} onChange={handleCheckboxChange} color='default' style={{ color: 'red' }}/>}
                  label="I agree with the Terms and Conditions and Privacy Policy"
                  style={{ cursor: 'pointer'}}
              />
          </div>

          <div className="d-flex justify-content-center">
          <Button
            className="mt-2"
            variant="contained"
            type="submit"
            style={{
              backgroundColor: '#F12027',
              borderRadius: '20px',
              width: '593px',
              height: '64px',
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
            }}
            onClick={handlelogin}
          >
            Login
          </Button>

          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}>
              <Divider style={{ width: '25%', height: '1px', backgroundColor: 'white' }} />
              <span style={{ margin: '0 70px', color: 'white' }}>or</span>
              <Divider style={{ width: '25%', height: '1px', backgroundColor: 'white' }} />
          </div>

          <div className="d-flex justify-content-center">
              <Button className="mt-2" variant="contained" type="submit" style={{backgroundColor: '#FFFFFF',color: 'black' , borderRadius: '20px' , width: '593px', height: '64px', fontSize: '24px', fontWeight: 'bold'}}>
              Google
              </Button>
          </div>

          <div className="d-flex justify-content-center">
              <Form.Text className="mt-4" style={{ color: 'white' }}>
                  I don't have a Google account? <a href="/signup" style={{ color: 'white', textDecoration: 'underline' }}>Sign up</a>
              </Form.Text>
          </div>
        </Form>
      </div>
    );
}

export default Login;
