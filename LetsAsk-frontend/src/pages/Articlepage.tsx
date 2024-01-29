import ArticleCard from "../components/ArticleCard";
import CommentCard from "../components/CommentCard";
import NavigationBar from "../components/Navbar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import WriteCommentCard from "../components/WriteCommentCard";


const Articlepage = () => {
    return (
        <div>
            <NavigationBar/>
            <Container>
                <Row>
                    <ArticleCard/>
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