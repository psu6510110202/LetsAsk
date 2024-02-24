import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChatIcon from '@mui/icons-material/Chat';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Articles from '../models/Articles';
import conf from "../conf";

interface Props {
    ArticleData : Articles 
}

function ArticleCard(props : Props) {
    const item = props.ArticleData.attributes
    const avatar = `${conf.apiPrefix}${item.AvatarCreator}`

    const dateTime = new Date(item.createdAt);

    const date = dateTime.toDateString();
    const time = dateTime.toTimeString().split(' ')[0];

    const tagsList = item.Tags.split(',').map(item => item.trim());
    // console.log(avatar)
    return (
        <Card style={{ width: '100rem', borderRadius: "40px" , backgroundColor: "#282727", color: "white", marginTop: "10px"}}>
            <Card.Body>
            <Card.Title>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h3>{item.Topic}</h3>
                </div>
            </Card.Title>

            <Card.Text>
                <Container fluid="md">
                    <Row>
                        <Col>
                            {tagsList.map((item) => 
                                <Button variant="contained" style={{backgroundColor: '#6B1212', borderRadius: '60px', marginRight: '10px'}}>{item}</Button>
                            )}
                        </Col>
                    </Row>
                </Container>
            </Card.Text>
            <Card.Text>
                <p>
                &nbsp;&nbsp;&nbsp;&nbsp;{item.Description}
                </p>
            </Card.Text>
            <Card.Text>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                        alt="Remy Sharp"
                        src={avatar}
                        sx={{ width: 56, height: 56, marginRight: "10px" }}
                    />
                    <h5 style={{color: "#F32222"}}>User: {item.Creator} &nbsp;&nbsp; {date} &nbsp;&nbsp; {time}</h5>
                    <div style={{ marginLeft: 'auto' }}>
                        <Row>
                            <Col style={{ display: "flex", alignItems: "center" }}>
                                <ChatIcon style={{ fontSize: '3rem', color: '#F32222' }} />
                                <h3 style={{ marginLeft: '5px' }}>{item.TotalComment}</h3>
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