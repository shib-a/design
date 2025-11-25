import React from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';

const ProfilePage = () => {
    return (
        <Box sx={{ p: 4, maxWidth: 600, margin: 'auto' }}>
            <Typography variant="h4" gutterBottom>Profile</Typography>
            <TextField label="Name" fullWidth sx={{ mb: 2 }} defaultValue="John Doe" />
            <TextField label="Email" fullWidth sx={{ mb: 2 }} defaultValue="john@example.com" />
            <TextField label="Password" type="password" fullWidth sx={{ mb: 2 }} />
            <Button variant="contained" color="primary" fullWidth>Save Changes</Button>
        </Box>
    );
};

export default ProfilePage;