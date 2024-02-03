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
    onTagClick: (tag: string) => void;
}


function TopicsCard(props: Props) {
    const navigate = useNavigate();
    const item = props.ArticleData.attributes

    const dateTime = new Date(item.createdAt);

    // Get the date and time components
    const date = dateTime.toDateString();
    const time = dateTime.toTimeString().split(' ')[0];

    const tagsList = item.Tags.split(',').map(item => item.trim());

    return (
        <Card style={{ width: '100rem', borderRadius: "40px" , backgroundColor: "#282727", color: "white", marginTop: "10px"}}>
        <Card.Body>
            <Container fluid="md">
            <Row>
                <Col xs={10}>
                    <Card.Title>
                        <h3 
                        style={{ cursor: 'pointer', textDecoration: 'underline' }} 
                        onClick={() => navigate(`/article/${props.ArticleData.id}`)
                        }>
                            {item.Topic}
                        </h3>
                    </Card.Title>
                </Col>
                <Col xs={{ order: 'last' }}>
                    <Row>
                        <Col style={{ display: "flex", alignItems: "center" }}>
                            <ChatIcon style={{ fontSize: '3rem', color: '#F32222' }} />
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
                            {tagsList.map((tag, index) => (
                                <Button
                                    key={index}
                                    variant="contained"
                                    style={{ backgroundColor: '#6B1212', borderRadius: '60px', marginRight: '10px' }}
                                    onClick={() => props.onTagClick(tag)}
                                >
                                    {tag}
                                </Button>
                            ))}
                        </Col>
                    </Row>
                </Container>
            </Card.Text>
            <Card.Text>
                <h5 style={{color: "#F32222"}}>User: {item.Creator} &nbsp;&nbsp; {date} &nbsp;&nbsp; {time}</h5>
            </Card.Text>
        </Card.Body>
        </Card>
    );
}

export default TopicsCard;