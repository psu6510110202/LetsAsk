import NavigationBar from "../components/Navbar";
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TopicsCard from "../components/TopicsCard";
import Repo from "../repositories"
import { useState, useEffect } from "react";
import Articles from "../models/Articles";
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

const Homepage = () => {
    const [articleData, setArticleData] = useState<Articles[]>([]);
    const [searchData, setSearchData] = useState('');
    const [currentArticlePage, setCurrentArticlePage] = useState(1);

    const dataPerpage: number = 5;
    const paginateArtValue = Math.ceil(articleData.length / dataPerpage);

    const handleSearchChange = (searchQuery : string) => {
        setSearchData(searchQuery);
    };

    const handlePaginationArtChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentArticlePage(value);
    };

    const fetchData = async () => {
        const res = await Repo.Articledata.getAll()
        if (res) {
            setArticleData(res)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const sortedArticleData = [...articleData].sort((a, b) => b.id - a.id);

    return (
        <div>
            <NavigationBar
                searchData={searchData}
                onSearchChange={handleSearchChange}
            />
            <div>
                <Carousel style={{ marginTop: "10px" }} interval={3000}>
                    <Carousel.Item>
                        <img src="/banner1.png" alt="Banner 1" height="200" className="mx-auto d-block" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="/banner2.png" alt="Banner 2" height="200" className="mx-auto d-block" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="/banner3.png" alt="Banner 3" height="200" className="mx-auto d-block" />
                    </Carousel.Item>
                </Carousel>

            </div>
            <Container fluid="md" style={{ color: "white", marginTop: "20px" }}>
                <Row>
                    <Col><h1>Breaking News</h1></Col>
                </Row>
                <Container fluid="md" style={{ color: "white", marginTop: "20px" }}>
                    {sortedArticleData
                        .filter(item => item.attributes.Topic.toLowerCase().includes(searchData.toLowerCase()))
                        .slice((currentArticlePage - 1) * dataPerpage, currentArticlePage * dataPerpage)
                        .map((item, index) => (
                            <Row key={index}>
                                <TopicsCard ArticleData={item} />
                            </Row>
                        ))}
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%" bgcolor="white" sx={{ borderRadius: 8 }} marginTop='1%' marginBottom='1%'>
                        <Stack spacing={2}>
                            <Pagination
                                count={paginateArtValue}
                                size="large"
                                color="primary"
                                showFirstButton
                                showLastButton
                                page={currentArticlePage}
                                onChange={handlePaginationArtChange}
                            />
                        </Stack>
                    </Box>
                </Container>
            </Container>
        </div>
    )
}

export default Homepage;