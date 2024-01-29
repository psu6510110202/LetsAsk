import Card from 'react-bootstrap/Card';
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login'

function WriteCommentCard() {
    return (
        <Card style={{ width: '100rem', height: '10rem', borderRadius: "40px", backgroundColor: "#282727", color: "white", marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Card.Body>
                <Card.Text style={{ textAlign: 'center', marginTop: '5%' }}>
                    <div>
                        <h4>You need to login before commenting</h4>
                        <Button variant='contained' style={{ backgroundColor: '#8A0A0A', borderRadius: '20px' }} href='/login'>
                            <LoginIcon style={{marginRight: "5px"}}/>
                            Login / Sign up
                        </Button>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>


    )

}

export default WriteCommentCard;