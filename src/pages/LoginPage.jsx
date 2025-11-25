import React, { useState, useContext } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = () => {
        if (login(username, password)) {
            navigate('/profile');
        } else {
            setError(true);
        }
    };

    return (
        <Box sx={{ p: 4, maxWidth: 400, margin: 'auto' }}>
            <Typography variant="h4" gutterBottom>Login</Typography>
            <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleLogin} sx={{ mb: 2 }}>
                Login
            </Button>
            {error && <Alert severity="error" sx={{ mb: 2 }}>Invalid credentials</Alert>}
            <Button variant="outlined" fullWidth component={Link} to="/register">
                Register
            </Button>
        </Box>
    );
};

export default LoginPage;