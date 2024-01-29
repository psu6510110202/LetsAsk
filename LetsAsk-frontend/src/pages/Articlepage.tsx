import ArticleCard from "../components/ArticleCard";
import CommentCard from "../components/CommentCard";
import NavigationBar from "../components/Navbar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import WriteCommentCard from "../components/WriteCommentCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Articles from "../models/Articles";
import Repo from "../repositories"


const Articlepage = () => {
    const [articleData, setArticleData] = useState<Articles[]>([])
    const params = useParams();

    const fetchData = async () => {
        const resp = await Repo.Articledata.getArticleById(params.id as string)
        if (resp) {
            if (Array.isArray(resp)) {
                setArticleData(resp);
            } else {
                setArticleData([resp]);
            }
        }
    }

    useEffect(() => {
        fetchData()
    },[params.id])

    const item: Articles | null = articleData.length > 0 ? articleData[0] : null;

    return (
        <div>
            <NavigationBar/>
            <Container>
                <Row>
                {item && <ArticleCard ArticleData={item}/>}
                </Row>
            </Container>
            <div style={{alignItems: 'center', display: "flex", justifyContent: 'center'}}>
                <hr
                    style={{
                        color: "red",
                        backgroundColor: "red",
                        height: 5,
                        width: '80%',
                        maxWidth: '80rem'
                    }}
                />
            </div>
            <Container>
                <Row>
                    <CommentCard commentNo={1}/>
                </Row>
                <Row>
                    <CommentCard commentNo={2}/>
                </Row>
                <Row>
                    <CommentCard commentNo={3}/>
                </Row>
                <Row>
                    <CommentCard commentNo={4}/>
                </Row>
                <Row>
                    <CommentCard commentNo={5}/>
                </Row>
            </Container>
            <div style={{alignItems: 'center', display: "flex", justifyContent: 'center'}}>
                <hr
                    style={{
                        color: "red",
                        backgroundColor: "red",
                        height: 5,
                        width: '80%',
                        maxWidth: '80rem'
                    }}
                />
            </div>
            <Container>
                <Row>
                    <WriteCommentCard/>
                </Row>
            </Container>
        </div>
    )
}

export default Articlepage;