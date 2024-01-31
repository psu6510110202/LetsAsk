import Card from 'react-bootstrap/Card';
import { Button, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login'
import { userData } from '../Helper';
import conf from '../conf';
import Form from 'react-bootstrap/Form';
import { ChangeEvent, useState } from 'react';
import Repo from '../repositories'
import Postcomment from '../models/PostComments';
import CryptoJS from 'crypto-js';
import toast from 'react-hot-toast';

interface Props {
    PostId: string
}

function WriteCommentCard(prop: Props) {
    const user = userData()
    const [commentText, setCommentText] = useState('')

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setCommentText(e.target.value)
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await Repo.Commentdata.createComment(newComment, user.jwt)
        await updateUserCommentCount();
        setCommentText('')
        toast.success("Comment success")
        window.location.reload()
    }

    const newComment : Postcomment = {
        data: {
            PostContentId: prop.PostId,
            Description: commentText,
            Creator: user.username,
            AvatarCreator: user.avatar
        }
    }

    const updateUserCommentCount = async () => {
        user.userComments = Number(user.userComments) + 1
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
    
    return (
        <>
            {!user.jwt &&
                <Card style={{ width: '100rem', height: '10rem', borderRadius: "40px", backgroundColor: "#282727", color: "white", marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Card.Body>
                        <Card.Text style={{ textAlign: 'center', marginTop: '5%' }}>
                            <div>
                                <h4>You need to login before commenting</h4>
                                <Button variant='contained' style={{ backgroundColor: '#8A0A0A', borderRadius: '20px' }} href='/login'>
                                    <LoginIcon style={{ marginRight: "5px" }} />
                                    Login / Sign up
                                </Button>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            }
            {user.jwt &&
                <Card style={{ width: '100rem', height: '15rem', borderRadius: "20px", backgroundColor: "#282727", color: "white", marginTop: "10px" }}>
                    <Typography variant="h5" style={{ marginTop: '10px', marginBottom: '10px', marginLeft: '15px' }}>
                        Your Comment
                    </Typography>
                    <Form.Control as="textarea" rows={5} placeholder="Write your comment here" style={{ marginLeft: '3px'}} onChange={handleChange} />
                    <Button type="submit" onClick={handleSubmit} variant="contained" style={{ backgroundColor: '#8A0A0A', borderRadius: '20px', marginTop: '10px', alignSelf: 'flex-end' }}>
                        Comment
                    </Button>
                </Card>
            }
        </>
    )

}

export default WriteCommentCard;

// {user.jwt &&
//     <Card.Text style={{ textAlign: 'center', marginTop: '5%' }}>
//         <Form.Group controlId="formBasicEmail" className="mt-5" >
//         <Form.Label>Enter your google email</Form.Label>
//         <Form.Control
//             style={{ backgroundColor: '#5B5B5B', borderRadius: '20px', width: '593px', height: '56px', color: 'white' }}
//             type="email"
//             name="identifier"
//             placeholder="Enter email"
//             onChange={handleChange}
//         />
//         </Form.Group>
//     </Card.Text>
// }