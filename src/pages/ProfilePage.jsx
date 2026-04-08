// ProfilePage.jsx (updated with logout button)
import React, { useContext } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Box sx={{ p: 4, maxWidth: 600, margin: 'auto' }}>
            <Typography variant="h4" gutterBottom>Profile</Typography>
            <TextField label="Name" fullWidth sx={{ mb: 2 }} defaultValue={user?.username || ''} />
            <TextField label="Email" fullWidth sx={{ mb: 2 }} defaultValue="john@example.com" />
            <TextField label="Password" type="password" fullWidth sx={{ mb: 2 }} />
            <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>Save changes</Button>
            <Button variant="outlined" color="error" fullWidth onClick={handleLogout}>Log Out</Button>
        </Box>
    );
};

export default ProfilePage;