import NavigationBar from "../components/Navbar";
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TopicsCard from "../components/TopicsCard";
import Repo from "../repositories"
import { useState, useEffect } from "react";
import Articles from "../models/Articles";
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

const Homepage = () => {
    const [articleData, setArticleData]  = useState<Articles[]>([]);

    const fetchData = async () => {
        const res = await Repo.Articledata.getAll()
        if(res) {
            setArticleData(res)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const sortedArticleData = [...articleData].sort((a, b) => b.id - a.id);

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
                {sortedArticleData.map((item, index) => 
                    <Row key={index}>
                        <TopicsCard ArticleData={item}/>
                    </Row>
                )}      
            </Container>
        </div>      
    )
}

export default Homepage;