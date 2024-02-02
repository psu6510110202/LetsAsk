import { useState, useEffect, useRef } from "react";
import Articles from "../models/Articles";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import BallotIcon from '@mui/icons-material/Ballot';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import NavigationBar from "../components/Navbar";
import "./Profilepage.css";
import { userData } from '../Helper';
import conf from '../conf';
import Comments from '../models/Comments';
import Repo from "../repositories"
import ProfileTopicsCard from "../components/ProfileTopicsCard";
import ProfileCommentCard from "../components/ProfileCommentCard";
import { Box, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from "react-router-dom";
import Tooltip from '@mui/joy/Tooltip';
import CryptoJS from 'crypto-js';
import LocalSeeIcon from '@mui/icons-material/LocalSee';

export default function Profilepage() {
    const user = userData();
    const navigate = useNavigate()
    const [articleData, setArticleData]  = useState<Articles[]>([]);
    const [commentData, setCommentData] = useState<Comments[]>([])
    const [currentArticlePage,  setCurrentArticlePage] = useState(1)
    const [currentCommentPage,  setCurrentCommentPage] = useState(1)
    const [searchData] = useState('');
    const [avatar, setAvatar] = useState<string>(`${conf.apiPrefix}${user.avatar}`);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if (selectedFile) {
            uploadAvatar(selectedFile);
        }
        // console.log("File Input Element:", fileInputRef.current);
    };

    const uploadAvatar = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('files', file);

            // console.log('JWT Token:', user.jwt);

            const response = await fetch(`${conf.apiPrefix}/api/upload`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${user.jwt}`
                },
                body: formData
            });

            if (!response.ok) {
                console.error(`Failed to upload image to Strapi: ${response.statusText}`);
                const errorData = await response.json();
                console.error('Error details:', errorData);
                throw new Error(`Failed to upload image to Strapi: ${response.statusText}`);
            }

            const responseData = await response.json();
            // console.log(responseData);
            // console.log(responseData[0].url);

            if (responseData.length > 0) {
                const newAvatarUrl = responseData[0].url;
                const updateState = `${conf.apiPrefix}${newAvatarUrl}`
                setAvatar(updateState);
                await fetch(`${conf.apiPrefix}/api/users/${user.id}`, {
                    method: 'PUT',
                    headers: {
                        "Authorization": `Bearer ${user.jwt}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ avatar: newAvatarUrl })
                })
            } else {
                console.error('Strapi did not return a valid response');
            }
        } catch (error) {
            console.error('Error uploading avatar to Strapi:', error);
        }
        updateSessions();
        // console.log("avatar: ", avatar);
    };

    const updateSessions = async () => {
        const userInfo = await fetch(`${conf.apiPrefix}/api/users/me?populate=*`, {
            headers: {
                "Authorization": `Bearer ${user.jwt}`
            }
        })

        const data = await userInfo.json();
        const encryptedData = sessionStorage.getItem('user');
        const secretKey = import.meta.env.VITE_SECRET_KEY;
        let info;
        if (encryptedData) {
            const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
            info = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }

        // console.log(info);
        info.avatar = data.avatar;

        const updatedEncryptedData = CryptoJS.AES.encrypt(JSON.stringify(info), secretKey).toString();
        sessionStorage.setItem('user', updatedEncryptedData);

        window.location.reload();
    }

    const handleSearchChange = () => {
        navigate('/')
    };
    const articleByUser = articleData.filter(data => data.attributes.Creator === `${user.username}` && data.attributes.Topic != 'Deleted')

    const filterArticleTitle = (id : number) => {
        const data = articleData.filter(a => a.id == id)
        const filterData = {
            id: data[0].id,
            title: data[0].attributes.Topic,
            totalComment: data[0].attributes.TotalComment
        }
        // console.log(filterData)
        return filterData
    }

    // const params = useParams();
    const dataPerpage : number = 2
    const lastArtIndex = currentArticlePage * dataPerpage
    const firstArtIndex = lastArtIndex - dataPerpage
    const lastCommentIndex = currentCommentPage * dataPerpage
    const firstCommentIndex = lastCommentIndex - dataPerpage

    const sortedArticleData = [...articleByUser].sort((a, b) => b.id - a.id);
    const sortedCommentData = [...commentData].sort((a, b) => b.id - a.id);

    const ArticlePaginateData = sortedArticleData.slice(firstArtIndex, lastArtIndex)
    const CommentPaginateData = sortedCommentData.slice(firstCommentIndex, lastCommentIndex)

    const paginateArtValue = Math.ceil(articleData.length/dataPerpage)
    const paginateCommentValue = Math.ceil(commentData.length/dataPerpage)

    const handlePaginationArtChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentArticlePage(value);
    };

    const handlePaginationCommentChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentCommentPage(value);
    };


    const fetchData = async () => {
        const respArticles = await Repo.Articledata.getAll()
        const respComments = await Repo.Commentdata.getCommentByUser(user.username)
        if(respArticles) {
            setArticleData(respArticles)
        }
        if(respComments) {
            setCommentData(respComments)
        }
        filterArticleTitle(sortedCommentData[0].attributes.PostContentId)
    }


    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <NavigationBar
                searchData={searchData}
                onSearchChange={handleSearchChange}
            />
            <div className="mainBox">
                <div className="leftBox">
                    <Card
                        color="warning"
                        invertedColors
                        size="lg"
                        variant="soft"
                    >
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                            <Tooltip title="Change Image" arrow>
                                <div>
                                    <Avatar
                                        src={avatar}
                                        sx={{ '--Avatar-size': '4rem', cursor: 'pointer', marginLeft: '20px' }}
                                    />
                                    <Chip
                                    size="sm"
                                    variant="soft"
                                    color="primary"
                                    sx={{
                                        mt: -1,
                                        mb: 1,
                                        border: '3px solid',
                                        borderColor: 'background.surface',
                                        marginTop: '10px'
                                    }}
                                    onClick={handleUploadClick}
                                    >
                                    <LocalSeeIcon sx={{fontSize: 'medium', marginRight: '5px'}}/>Upload Avatar
                                    </Chip>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        style={{ display: "none" }}
                                        ref={fileInputRef}
                                        id="fileInput"
                                    />
                                </div>
                            </Tooltip>
                            <Typography level="title-lg">{user.username}</Typography>
                            <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
                            Hello, I am {user.username}. I have already posted {user.userArticles} articles and commented on any article on this website {user.userComments} times.</Typography>
                        </CardContent>
                        <CardOverflow
                            variant="soft"
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 1,
                                justifyContent: 'space-around',
                                py: 1,
                                borderTop: '3px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <Typography startDecorator={<BallotIcon />} level="title-sm">
                                {user.userArticles == null ? 0 : user.userArticles}
                            </Typography>
                            <Divider orientation="vertical" />
                            <Typography startDecorator={<CommentOutlinedIcon />} level="title-sm">
                                {user.userComments}
                            </Typography>
                        </CardOverflow>
                    </Card>
                </div>
                <div className="centerBox">
                    <h1>POST</h1>
                    <Container fluid="md" style={{ color: "white", marginTop: "20px"}}>
                        {ArticlePaginateData.map((item, index) =>
                            <Row key={index}>
                                <ProfileTopicsCard ArticleData={item} />
                            </Row>
                        )}
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%" bgcolor="white" sx={{borderRadius: 8}} marginTop='1%' marginBottom='1%'>
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
                </div>
                <div className="rightBox">
                    <h1>COMMENT</h1>
                    <Container fluid="md" style={{ color: "white", marginTop: "20px"}}>
                        {CommentPaginateData.map((item, index) =>
                            <Row key={index}>
                                <ProfileCommentCard CommentData={item} index={index} article={filterArticleTitle(item.attributes.PostContentId)}/>
                            </Row>
                        )}
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%" bgcolor="white" sx={{borderRadius: 8}} marginTop='1%' marginBottom='1%'>
                            <Stack spacing={2}>
                                <Pagination
                                    count={paginateCommentValue}
                                    size="large"
                                    color="primary"
                                    showFirstButton
                                    showLastButton
                                    page={currentCommentPage}
                                    onChange={handlePaginationCommentChange}
                                />
                            </Stack>
                        </Box>
                    </Container>
                </div>
            </div>
        </div>
    );
}