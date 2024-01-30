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
import Comments from "../models/Comments";


const Articlepage = () => {
    const [articleData, setArticleData] = useState<Articles[]>([])
    const [commentData, setCommentData] = useState<Comments[]>([])
    const params = useParams();

    const fetchData = async () => {
        const respArticles = await Repo.Articledata.getArticleById(params.id as string)
        if (respArticles) {
            if (Array.isArray(respArticles)) {
                setArticleData(respArticles);
            } else {
                setArticleData([respArticles]);
            }
        }
        const respComments = await Repo.Commentdata.getCommentByPostId(params.id as string)
        if (respComments) {
            setCommentData(respComments)
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
                {commentData.map((item, index) => 
                    <Row key={index}>
                        <CommentCard CommentData={item} index={index}/>
                    </Row>
                )}
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
                    <WriteCommentCard PostId={params.id as string}/>
                </Row>
            </Container>
        </div>
    )
}

export default Articlepage;