import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChatIcon from '@mui/icons-material/Chat';
import Button from '@mui/material/Button';


function TopicsCard() {
  return (
    <Card style={{ width: '100rem', borderRadius: "40px" , backgroundColor: "#282727", color: "white", marginTop: "10px"}}>
      <Card.Body>
        <Container fluid="md">
        <Row>
            <Col xs={10}>
                <Card.Title>
                    <h3><a href='/article/1' style={{ color: "white" }}>I don’t know why my cat is so cute, I can’t take my eyes off!</a></h3>
                </Card.Title>
            </Col>
            <Col xs={{ order: 'last' }}>
                <Row>
                    <Col style={{ display: "flex", alignItems: "center" }}>
                        <ChatIcon style={{ fontSize: '3rem', color: '#F32222' }} />
                        <h3 style={{ marginLeft: '5px' }}>5</h3>
                    </Col>
                </Row>
            </Col>
        </Row>
        </Container>
        <Card.Text>
            <Container fluid="md">
                <Row>
                    <Col>
                        <Button variant="contained" style={{backgroundColor: '#6B1212', borderRadius: '60px', marginRight: '10px'}}>Pet</Button>
                        <Button variant="contained" style={{backgroundColor: '#6B1212', borderRadius: '60px', marginRight: '10px'}}>Life problem</Button>
                    </Col>
                </Row>
            </Container>
        </Card.Text>
        <Card.Text>
             <h5 style={{color: "#F32222"}}>User: @Ilovemycat &nbsp;&nbsp; 28/10/2024 &nbsp;&nbsp; 22:30</h5>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default TopicsCard;