import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChatIcon from '@mui/icons-material/Chat';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import FlagIcon from '@mui/icons-material/Flag';



function ArticleCard() {
  return (
    <Card style={{ width: '100rem', borderRadius: "40px" , backgroundColor: "#282727", color: "white", marginTop: "10px"}}>
        <Card.Body>
        <Card.Title>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h3>I don’t know why my cat is so cute, I can’t take my eyes off!</h3>
                <Button>
                    <FlagIcon style={{ fontSize: '2rem', color: '#F32222' }} />
                </Button>
            </div>
        </Card.Title>

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
            <p>
            &nbsp;&nbsp;&nbsp;&nbsp;I can't help but marvel at the adorable nature of my cat. It's as if there's an enchanting spell cast upon him that makes it impossible for me to look away. Every time he gracefully moves or playfully pounces, my heart melts. The inexplicable charm that radiates from him captivates my attention, leaving me in awe. His fur, soft and silky, invites endless cuddles, and those big, expressive eyes seem to hold a universe of charm. I find myself constantly drawn to his cute antics, whether he's chasing his tail, batting at a feather, 
            or simply lounging in the sun. It's a joy to witness such innocence and playfulness.
            </p>
        </Card.Text>
        <Card.Text>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                    alt="Remy Sharp"
                    src="/avatar1.jpeg"
                    sx={{ width: 56, height: 56, marginRight: "10px" }}
                />
                <h5 style={{color: "#F32222"}}>User: @Ilovemycat &nbsp;&nbsp; 28/10/2024 &nbsp;&nbsp; 22:30</h5>
                <div style={{ marginLeft: 'auto' }}>
                    <Row>
                        <Col style={{ display: "flex", alignItems: "center" }}>
                            <ChatIcon style={{ fontSize: '3rem', color: '#F32222' }} />
                            <h3 style={{ marginLeft: '5px' }}>5</h3>
                        </Col>
                    </Row>
                </div>
            </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ArticleCard;