import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Form from 'react-bootstrap/Form';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import React, { useState } from 'react';


export default function Signuppage() {

    const [checked, setChecked] = React.useState(true);
    const [newUser, setUSer] = useState<{
        displayName: string;
        email: string;
        password: string;
        confirmPassword: string;
    }>({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { displayName, email, password, confirmPassword } = newUser;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUSer({ ...newUser, [name]: value });
    };

    const onSubmit = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Password and Confirm Password do not match");
            return;
        }

        // reset form
        setUSer({
            displayName: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
    };

    const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setChecked(event.target.checked);
    };

    return (
        <div className="container mt-6" style={{ color: 'white', padding: '20px' }}>
            <h2 className="text-center">Sign up</h2>
            <h6 className="text-center">Enter your google account  details to continue</h6>
            <div className="Signup">
                <form noValidate autoComplete="off" onSubmit={onSubmit}>
                    <div className="d-flex justify-content-center">
                        <Form.Group controlId="formBasicUsername" className="mt-5" >
                            <Form.Label>Enter your username</Form.Label>
                            <Form.Control
                                style={{ backgroundColor: '#5B5B5B', borderRadius: '20px', width: '593px', height: '56px', color: 'white' }}
                                type="username"
                                name="displayName"
                                placeholder="Enter username"
                                onChange={onChange}
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
                                onChange={onChange}
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
                                onChange={onChange}
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
                                onChange={onChange}
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

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}>
                        <Divider style={{ width: '25%', height: '1px', backgroundColor: 'white' }} />
                        <span style={{ margin: '0 70px', color: 'white' }}>or</span>
                        <Divider style={{ width: '25%', height: '1px', backgroundColor: 'white' }} />
                    </div>

                    <div className="d-flex justify-content-center">
                        <Button className="mt-2" variant="contained" type="submit" style={{ backgroundColor: '#FFFFFF', color: 'black', borderRadius: '20px', width: '593px', height: '64px', fontSize: '24px', fontWeight: 'bold' }}>
                            Google
                        </Button>
                    </div>

                    <div className="d-flex justify-content-center">
                        <Form.Text className="mt-4" style={{ color: 'white' }}>
                            I already have an account? <a href="/login" style={{ color: 'white', textDecoration: 'underline' }}>Login</a>
                        </Form.Text>
                    </div>
                </form>
            </div>
        </div>
    );
}
