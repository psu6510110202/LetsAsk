import ArticleCard from "../components/ArticleCard";
import CommentCard from "../components/CommentCard";
import NavigationBar from "../components/Navbar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import WriteCommentCard from "../components/WriteCommentCard";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Articles from "../models/Articles";
import Repo from "../repositories"
import Comments from "../models/Comments";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';

const Articlepage = () => {
    const navigate = useNavigate()
    const [articleData, setArticleData] = useState<Articles[]>([])
    const [commentData, setCommentData] = useState<Comments[]>([])
    const [searchData] = useState('');

    const handleSearchChange = () => {
        navigate('/')
    };

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
    const showDeleted = item?.attributes.Topic === 'Deleted' ? true:false

    return (
        <div>
            <NavigationBar
                searchData={searchData}
                onSearchChange={handleSearchChange}
            />
            {showDeleted && (
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    color: 'white',
                    }}
                >
                    <Typography variant="h1" gutterBottom>
                    <CancelIcon sx={{ fontSize: '6rem', marginRight: '5px' }} />Article had been deleted.
                    </Typography>
                </Box>
            )}
                
            {item && !showDeleted  &&
            <>
                <Container>
                    <Row>
                        <ArticleCard ArticleData={item}/>
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
                        <WriteCommentCard PostId={params.id as string} TotalComment={item?.attributes.TotalComment as number}/>
                    </Row>
                </Container>
            </>
            } 
        </div>
    )
}

export default Articlepage;