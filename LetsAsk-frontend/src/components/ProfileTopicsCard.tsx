import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChatIcon from '@mui/icons-material/Chat';
import Button from '@mui/material/Button';
import Articles from '../models/Articles';
import { useNavigate } from 'react-router-dom';

interface Props {
    ArticleData : Articles
}


function ProfileTopicsCard(props: Props) {
    const navigate = useNavigate();
    const item = props.ArticleData.attributes

    const dateTime = new Date(item.createdAt);

    // Get the date and time components
    const date = dateTime.toDateString();
    const time = dateTime.toTimeString().split(' ')[0];

    const tagsList = item.Tags.split(',').map(item => item.trim());

    return (
        <Card style={{ width: '450px', borderRadius: "40px" , backgroundColor: "#282727", color: "white", marginTop: "10px"}}>
        <Card.Body>
            <Container fluid="md">
            <Row>
                <Col xs={10}>
                    <Card.Title>
                        <p
                        style={{ cursor: 'pointer', textDecoration: 'underline', fontSize: '16px' }} 
                        onClick={() => navigate(`/article/${props.ArticleData.id}`)
                        }>
                            {item.Topic}
                        </p>
                    </Card.Title>
                </Col>
                <Col xs={{ order: 'last' }}>
                    <Row>
                        <Col style={{ display: "flex", alignItems: "center" }}>
                            <ChatIcon style={{ fontSize: '1rem', color: '#F32222' }} />
                            <h3 style={{ marginLeft: '5px' }}>{item.TotalComment}</h3>
                        </Col>
                    </Row>
                </Col>
            </Row>
            </Container>
            <Card.Text>
                <Container fluid="md">
                    <Row>
                        <Col>
                        {tagsList.map((item) => 
                            <Button variant="contained" style={{backgroundColor: '#6B1212', borderRadius: '60px', marginRight: '10px', fontSize: '10px', marginTop: '3px'}}>{item}</Button>
                        )}
                        </Col>
                    </Row>
                </Container>
            </Card.Text>
            <Card.Text>
                <p style={{color: "#F32222" ,fontSize: '16px'}}>User: {item.Creator} &nbsp;&nbsp; {date} &nbsp;&nbsp; {time}</p>
            </Card.Text>
        </Card.Body>
        </Card>
    );
}

export default ProfileTopicsCard;