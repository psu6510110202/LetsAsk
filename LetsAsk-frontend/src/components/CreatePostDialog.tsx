import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PostArticle from '../models/PostArticles';
import Repo from '../repositories';
import toast from 'react-hot-toast';
import CryptoJS from 'crypto-js';
import { userData } from '../Helper';
import conf from '../conf';

interface CreatePostDialogProps {
  open: boolean;
  handleClose: () => void;
}

const CreatePostDialog: React.FC<CreatePostDialogProps> = ({ open, handleClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: '',
    });
    const user = userData()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        formData.tags
            .replace(/\s*,\s*/g, ', ')
            .replace(/,{2,}/g, ',');

        const tagsArray = formData.tags
        .split(',')
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag !== '')
        .map((tag: string) => {
            // Check if the tag contains alphabets, and convert to lowercase if true
            return /[a-zA-Z]/.test(tag) ? tag.toLowerCase() : tag;
        });

        formData.tags = tagsArray.join(', ');

        const postData: PostArticle = {
        data: {
            Topic: formData.title,
            Description: formData.description,
            Creator: user.username,
            TotalComment: 0,
            AvatarCreator: user.avatar,
            Tags: formData.tags,
        },};

        await Repo.Articledata.createArticle(postData, user.jwt);
        await updateUserArticleCount();
        toast.success('Post success');

        handleClose();

        window.location.reload();
    };

    const updateUserArticleCount = async () => {
        user.userArticles = Number(user.userArticles) + 1;

        const secretKey = import.meta.env.VITE_SECRET_KEY;
        const updatedEncryptedData = CryptoJS.AES.encrypt(JSON.stringify(user), secretKey).toString();

        sessionStorage.setItem('user', updatedEncryptedData);

        const updateData = {
        userArticles: user.userArticles,
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
        <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
            component: 'form',
            onSubmit: handleSubmit,
        }}
        >
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', color: 'white' }}>
            <DialogTitle style={{ fontWeight: 'bold' }}>Create Post</DialogTitle>
            <DialogContent>
            <DialogContentText style={{ color: 'white' }}>
                To create the post, please fill in all the fields for better
                communication if possible.
            </DialogContentText>
            <TextField
                autoFocus
                required
                margin="dense"
                id="title"
                name="title"
                label="Article Title"
                type="text"
                fullWidth
                variant="filled"
                style={{ backgroundColor: 'white', borderRadius: '10px' }}
                onChange={handleInputChange}
                value={formData.title}
            />
            <TextField
                autoFocus
                required
                margin="dense"
                id="description"
                name="description"
                label="Description"
                type="text"
                fullWidth
                variant="filled"
                multiline
                rows={8}
                style={{ backgroundColor: 'white', borderRadius: '10px' }}
                onChange={handleInputChange}
                value={formData.description}
            />
            <TextField
                autoFocus
                margin="dense"
                id="tags"
                name="tags"
                label="Tags (comma-separated) Limit 60 Character"
                type="text"
                fullWidth
                variant="filled"
                style={{ backgroundColor: 'white', borderRadius: '10px' }}
                inputProps={{
                maxLength: 60,
                }}
                onChange={handleInputChange}
                value={formData.tags}
                required
            />
            </DialogContent>
            <DialogActions>
            <Button
                variant="contained"
                onClick={handleClose}
                style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                color: 'black',
                fontWeight: 'bold',
                }}
            >
                Cancel
            </Button>
            <Button
                type="submit"
                style={{
                backgroundColor: '#8A0A0A',
                borderRadius: '20px',
                color: 'white',
                fontWeight: 'bold',
                }}
            >
                Create Post
            </Button>
            </DialogActions>
        </div>
        </Dialog>
    );
};

export default CreatePostDialog;
