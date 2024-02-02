import Card from 'react-bootstrap/Card';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import FlagIcon from '@mui/icons-material/Flag';
import { Button } from '@mui/material';
import Comments from '../models/Comments';
import conf from '../conf'

interface Props {
    CommentData: Comments;
    index : number;
  }

function CommentCard(prop: Props) {

  const item = prop.CommentData.attributes
  const avatar = `${conf.apiPrefix}${item.AvatarCreator}`

  const dateTime = new Date(item.createdAt);

    // Get the date and time components
  const date = dateTime.toDateString();
  const time = dateTime.toTimeString().split(' ')[0];

  return (
    <Card style={{ width: '100rem', borderRadius: "40px" , backgroundColor: "#282727", color: "white", marginTop: "10px"}}>
      <Card.Body>
        <Card.Text>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h6 style={{color: '#F32222'}}>Comment {prop.index + 1}</h6>
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

export default CommentCard;