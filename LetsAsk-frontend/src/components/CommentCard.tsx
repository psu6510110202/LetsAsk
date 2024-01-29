import Card from 'react-bootstrap/Card';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import FlagIcon from '@mui/icons-material/Flag';
import { Button } from '@mui/material';


interface CommentCardProps {
    commentNo: number;
  }

function CommentCard({ commentNo }: CommentCardProps) {
  return (
    <Card style={{ width: '100rem', borderRadius: "40px" , backgroundColor: "#282727", color: "white", marginTop: "10px"}}>
      <Card.Body>
        <Card.Text>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h6 style={{color: '#F32222'}}>Comment {commentNo}</h6>
                <Button>
                    <FlagIcon style={{ fontSize: '2rem', color: '#F32222' }} />
                </Button>
            </div>
        </Card.Text>
        <Card.Text>
            <p>
            &nbsp;&nbsp;&nbsp;&nbsp;Your description of your adorable cat is so relatable! Cats have this magical ability to captivate us with their cuteness 
            and playful behavior. It's like they have a special charm that makes it impossible to resist showering them with love and attention.
            </p>
        </Card.Text>
        <Card.Text>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                    alt="Remy Sharp"
                    src="/avatar2.jpeg"
                    sx={{ width: 56, height: 56, marginRight: "10px" }}
                />
                <h6 style={{color: "#F32222"}}>User: @Imnotlolicon &nbsp;&nbsp; 28/10/2024 &nbsp;&nbsp; 22:30</h6>
            </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CommentCard;