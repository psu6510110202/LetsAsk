import Card from 'react-bootstrap/Card';
import { Button, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login'
import { userData } from '../Helper';
import conf from '../conf';
import Form from 'react-bootstrap/Form';

function WriteCommentCard() {
    const user = userData()
    const avatar = `${conf.apiPrefix}${user.avatar}`

    return (
        <>
            {!user.jwt &&
                <Card style={{ width: '100rem', height: '10rem', borderRadius: "40px", backgroundColor: "#282727", color: "white", marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Card.Body>
                        <Card.Text style={{ textAlign: 'center', marginTop: '5%' }}>
                            <div>
                                <h4>You need to login before commenting</h4>
                                <Button variant='contained' style={{ backgroundColor: '#8A0A0A', borderRadius: '20px' }} href='/login'>
                                    <LoginIcon style={{ marginRight: "5px" }} />
                                    Login / Sign up
                                </Button>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            }
            {user.jwt &&
                <Card style={{ width: '100rem', height: '15rem', borderRadius: "20px", backgroundColor: "#282727", color: "white", marginTop: "10px" }}>
                    <Typography variant="h5" style={{ marginTop: '10px', marginBottom: '10px', marginLeft: '15px' }}>
                        Your Comment
                    </Typography>
                    <Form.Control as="textarea" rows={5} placeholder="Write your comment here" style={{ marginLeft: '3px'}} />
                    <Button variant="contained" style={{ backgroundColor: '#8A0A0A', borderRadius: '20px', marginTop: '10px', alignSelf: 'flex-end' }}>
                        Comment
                    </Button>
                </Card>
            }
        </>
    )

}

export default WriteCommentCard;

// {user.jwt &&
//     <Card.Text style={{ textAlign: 'center', marginTop: '5%' }}>
//         <Form.Group controlId="formBasicEmail" className="mt-5" >
//         <Form.Label>Enter your google email</Form.Label>
//         <Form.Control
//             style={{ backgroundColor: '#5B5B5B', borderRadius: '20px', width: '593px', height: '56px', color: 'white' }}
//             type="email"
//             name="identifier"
//             placeholder="Enter email"
//             onChange={handleChange}
//         />
//         </Form.Group>
//     </Card.Text>
// }