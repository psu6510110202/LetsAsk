// import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Form from 'react-bootstrap/Form';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import React, { useState, useEffect } from 'react';
import { userData } from "../Helper";
import { useNavigate } from "react-router";
import conf from "../conf";
import axios from "axios";
import toast from "react-hot-toast";

const initialUser = { email: '', password: '', confirmPassword: '',username: '' };

export default function Signuppage() {
    const navigate = useNavigate()
    const [checked, setChecked] = React.useState(true);
    const [newUser, setUser] = useState(initialUser)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const trimmedValue = value.trim();
        setUser({
            ...newUser,
            [name]: trimmedValue,
        });

    };

    const onSubmit = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();

        if (newUser.password !== newUser.confirmPassword) {
            alert("Password and Confirm Password do not match");
            return;
        }

        const url = `${conf.apiPrefix}/api/auth/local/register`
        const data = {
            username: newUser.username,
            email: newUser.email,
            password: newUser.password
        }
        // console.log(data)
        try {
            await axios.post(url, data)
            toast.success('Registion Successfully')
            navigate('/login', {replace: true})
        } catch {
            toast.error("Username or Email has already exist.")
        }

        setUser({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
    };

    const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setChecked(event.target.checked);
    };

    useEffect(() => {
        const data = userData();
        if(data.jwt) {
          navigate('/')
        }
      });
  

    return (
        <div className="container mt-6" style={{ color: 'white', padding: '20px' }}>
            <h2 className="text-center">Sign up</h2>
            <h6 className="text-center">Enter your account  details to continue</h6>
            <div className="Signup">
                <form noValidate autoComplete="off" onSubmit={onSubmit}>
                    <div className="d-flex justify-content-center">
                        <Form.Group controlId="formBasicUsername" className="mt-5" >
                            <Form.Label>Enter your username</Form.Label>
                            <Form.Control
                                style={{ backgroundColor: '#5B5B5B', borderRadius: '20px', width: '593px', height: '56px', color: 'white' }}
                                type="username"
                                name="username"
                                placeholder="Enter username"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div>

                    <div className="d-flex justify-content-center">
                        <Form.Group controlId="formBasicEmail" className="mt-3">
                            <Form.Label>Enter your email</Form.Label>
                            <Form.Control
                                style={{ backgroundColor: '#5B5B5B', borderRadius: '20px', width: '593px', height: '56px', color: 'white' }}
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div>

                    <div className="d-flex justify-content-center">
                        <Form.Group controlId="formBasicPassword" className="mt-3" >
                            <Form.Label>Enter your password</Form.Label>
                            <Form.Control
                                style={{ backgroundColor: '#5B5B5B', borderRadius: '20px', width: '593px', height: '56px', color: 'white' }}
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div>

                    <div className="d-flex justify-content-center">
                        <Form.Group controlId="formBasicPassword" className="mt-3">
                            <Form.Label>Confirm your password</Form.Label>
                            <Form.Control
                                style={{ backgroundColor: '#5B5B5B', borderRadius: '20px', width: '593px', height: '56px', color: 'white' }}
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm password"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div>

                    <div className="d-flex justify-content-center">
                        <FormControlLabel
                            className='mt-3'
                            control={<Checkbox checked={checked} onChange={handleCheckboxChange} color='default' style={{ color: 'red' }} />}
                            label="I agree with the Terms and Conditions and Privacy Policy"
                            style={{ cursor: 'pointer' }}
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
                        >
                            Sign Up
                        </Button>

                    </div>
                    <div className="d-flex justify-content-center">
                        <Form.Text className="mt-4" style={{ color: 'white' }}>
                            Already have an account? <a href="/login" style={{ color: 'white', textDecoration: 'underline' }}>Login</a>
                        </Form.Text>
                    </div>
                </form>
            </div>
        </div>
    );
}
