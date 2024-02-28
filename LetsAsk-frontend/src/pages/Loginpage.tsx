import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import conf from '../conf';
import axios from 'axios';
import { storeUser, userData } from '../Helper';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const initialUser = { identifier: '', password: '' }

const Loginpage = () => {

    const [user, setUser] = useState(initialUser);
    const navigate = useNavigate()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value,
        })
        //console.log(user.identifier, user.password)
    }

    const handlelogin = async (event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
        const url = `${conf.apiPrefix}/api/auth/local`
        event.preventDefault();
        if (event.type === 'submit') {
            event.preventDefault(); // Prevent the default form submission behavior
        }
        try {
            if (user.identifier && user.password) {
                const { data } = await axios.post(url, user)
                if (data.jwt) {
                    storeUser(data)

                    toast.success('Login successful')

                    setUser(initialUser)
                    setTimeout(() => {
                        setUser(initialUser);
                        navigate('/');
                    }, 2000);
                }
            }
        } catch (err) {
            toast.error("Invalid email or password", {
            })
        }
    }

    useEffect(() => {
        const data = userData();
        try {
            if (data.jwt) {
                navigate('/')
            }
        } catch {
            navigate('/login')
        }
    })

    return (
        <div className="container mt-6" style={{ color: 'white', padding: '20px' }}>
            <h2 className="text-center">Login</h2>
            <h6 className="text-center">Enter your account  details to continue</h6>
            <Form>
                <div className="d-flex justify-content-center">
                    <Form.Group controlId="formBasicEmail" className="mt-5" >
                        <Form.Label>Enter your email</Form.Label>
                        <Form.Control
                            style={{ backgroundColor: '#5B5B5B', borderRadius: '20px', width: '593px', height: '56px', color: 'white' }}
                            type="email"
                            name="identifier"
                            placeholder="Enter email"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <div className="d-flex justify-content-center">
                    <Form.Group controlId="formBasicPassword" className="mt-3">
                        <Form.Label>Enter your password</Form.Label>
                        <Form.Control
                            style={{ backgroundColor: '#5B5B5B', borderRadius: '20px', width: '593px', height: '56px', color: 'white' }}
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <div className="d-flex justify-content-center">
                    <Button
                        className="mt-5"
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

                <div className="d-flex justify-content-center">
                    <Form.Text className="mt-4" style={{ color: 'white' }}>
                        Don't have a account? <a href="/signup" style={{ color: 'white', textDecoration: 'underline' }}>Sign up</a>
                    </Form.Text>
                </div>
            </Form>
        </div>
    );
}

export default Loginpage;