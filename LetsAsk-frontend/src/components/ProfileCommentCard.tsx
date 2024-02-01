import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Comments from '../models/Comments';
import conf from '../conf';
import { useNavigate } from 'react-router-dom';
import Repo from '../repositories';
import { userData } from '../Helper';
import toast from 'react-hot-toast';
import CryptoJS from 'crypto-js';

interface Props {
  CommentData: Comments;
  index: number;
  article: {
    id: number,
    title: string,
    totalComment: number
  };
}

function ProfileCommentCard(prop: Props) {
  const user = userData();
  const navigate = useNavigate();
  const item = prop.CommentData.attributes;
  const avatar = `${conf.apiPrefix}${item.AvatarCreator}`;

  const dateTime = new Date(item.createdAt);

  // Get the date and time components
  const date = dateTime.toDateString();
  const time = dateTime.toTimeString().split(' ')[0];

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    await Repo.Commentdata.deleteCommentById(prop.CommentData.id, user.jwt);
    await updatePostTotalcomment()
    await updateUserCommentCount()
    toast.success('Delete Comment success');
    setOpenDeleteDialog(false);
    window.location.reload();
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
  };

  const updateUserCommentCount = async () => {
    user.userComments = Number(user.userComments) - 1
    const secretKey = import.meta.env.VITE_SECRET_KEY
    const updatedEncryptedData = CryptoJS.AES.encrypt(JSON.stringify(user), secretKey).toString();

    sessionStorage.setItem('user', updatedEncryptedData)

    const updateData = {
        userComments: user.userComments
    }
  
    await fetch(`${conf.apiPrefix}/api/users/${user.id}`, {
        method : 'PUT',
        headers :{
          "Authorization" : `Bearer ${user.jwt}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
      })
  
  }

  const updatePostTotalcomment = async() => {
    // console.log(user.jwt)
    const updateData = {
        data: {
            TotalComment: prop.article.totalComment - 1
        }
    }
    await fetch(`${conf.apiPrefix}/api/post-contents/${item.PostContentId}`, {
        method : 'PUT',
        headers :{
          "Authorization" : `Bearer ${user.jwt}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
      })
}

  return (
    <>
      <Card style={{ width: '450px', borderRadius: '40px', backgroundColor: '#282727', color: 'white', marginTop: '10px' }}>
        <Card.Body>
          <Card.Text>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h6 style={{ color: '#F32222', display: 'inline' }}>
                Topics:{' '}
                <h6
                  style={{
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    display: 'inline',
                    marginLeft: '5px',
                    color: 'white',
                  }}
                  onClick={() => navigate(`/article/${item.PostContentId}`)}
                >
                  {prop.article.title}
                </h6>
              </h6>
              <Button onClick={handleDeleteClick}>
                <DeleteIcon style={{ fontSize: '2rem', color: '#F32222' }} />
              </Button>
            </div>
          </Card.Text>
          <Card.Text>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;{item.Description}</p>
          </Card.Text>
          <Card.Text>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar alt="Remy Sharp" src={avatar} sx={{ width: 56, height: 56, marginRight: '10px' }} />
              <h6 style={{ color: '#F32222' }}>User: {item.Creator}&nbsp;&nbsp;{date}&nbsp;&nbsp;{time}</h6>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Comment</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this comment?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProfileCommentCard;
