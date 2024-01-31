import Card from 'react-bootstrap/Card';
import Avatar from '@mui/material/Avatar';
import FlagIcon from '@mui/icons-material/Flag';
import { Button } from '@mui/material';
import Comments from '../models/Comments';
import conf from '../conf'
import { useNavigate } from 'react-router-dom';

interface Props {
    CommentData: Comments;
    index : number;
    articleTitle: string;
  }

function ProfileCommentCard(prop: Props) {
  const navigate = useNavigate()
  const item = prop.CommentData.attributes
  const avatar = `${conf.apiPrefix}${item.AvatarCreator}`

  const dateTime = new Date(item.createdAt);

    // Get the date and time components
  const date = dateTime.toDateString();
  const time = dateTime.toTimeString().split(' ')[0];

  return (
    <Card style={{ width: '450px', borderRadius: "40px" , backgroundColor: "#282727", color: "white", marginTop: "10px"}}>
      <Card.Body>
        <Card.Text>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h6 style={{ color: '#F32222', display: 'inline' }}>Topics: 
                    <h6
                        style={{ 
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            display: 'inline',
                            marginLeft: '5px',
                            color: 'white'
                        }}
                        onClick={() => navigate(`/article/${item.PostContentId}`)}
                    >
                        {prop.articleTitle}
                    </h6>
                </h6>
                <Button>
                    <FlagIcon style={{ fontSize: '2rem', color: '#F32222' }} />
                </Button>
            </div>
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
                <h6 style={{color: "#F32222"}}>User: {item.Creator} &nbsp;&nbsp; {date} &nbsp;&nbsp; {time}</h6>
            </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProfileCommentCard;