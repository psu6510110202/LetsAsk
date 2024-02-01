import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import conf from '../conf';
import toast from 'react-hot-toast';
import CryptoJS from 'crypto-js';

interface DialogDeleteArticleProp {
    open: boolean;
    user : {
        id: number,
        username: string,
        avatar: string,
        userComments: number,
        userArticles: number,
        jwt: string
    },
    articleId : number,
    handleClose: () => void;
  }

const DialogDeleteArticle : React.FC<DialogDeleteArticleProp> = ({ open, user, articleId,handleClose }) => {

    const handleDeleteArticle = async () => {
        const updateData = {
            data : {
                Topic: 'Deleted',
                Description : 'Deleted',
                TotalComment: 0,
                Tags: 'Deleted'
            }           
        }
        await fetch(`${conf.apiPrefix}/api/post-contents/${articleId}`, {
            method : 'PUT',
            headers :{
              "Authorization" : `Bearer ${user.jwt}`,
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(updateData)
        })
        
        await updateUserArticleCount();
        toast.success('Delete Comment success');
        handleClose();
        window.location.reload();
    };

    const updateUserArticleCount = async () => {
        const updatedUser = { ...user };
        updatedUser.userArticles = Number(updatedUser.userArticles) - 1;

        const secretKey = import.meta.env.VITE_SECRET_KEY;
        const updatedEncryptedData = CryptoJS.AES.encrypt(JSON.stringify(updatedUser), secretKey).toString();

        sessionStorage.setItem('user', updatedEncryptedData);

        const updateData = {
            userArticles: updatedUser.userArticles,
        };

        await fetch(`${conf.apiPrefix}/api/users/${user.id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${user.jwt}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this article?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleDeleteArticle} color="primary">
                    <DeleteIcon style={{ fontSize: '1.5rem' }} />
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogDeleteArticle;
