import NavigationBar from "../components/Navbar";
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TopicsCard from "../components/TopicsCard";
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

const Homepage = () => {
    return (
        <div>
            <NavigationBar/>
            <div>
                <Carousel style={{marginTop: "10px"}}>
                    <Carousel.Item style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img src="/banner1.png" height="200" />
                    </Carousel.Item>
                </Carousel>
            </div>
            <Container fluid="md" style={{color: "white", marginTop: "20px"}}>
                <Row>
                    <Col><h1>Breaking News</h1></Col>
                </Row>
                <Row>
                    <TopicsCard/>
                </Row>
                <Row>
                    <TopicsCard/>
                </Row>
                <Row>
                    <TopicsCard/>
                </Row>
            </Container>
        </div>      
    )
}

export default Homepage;