import React, { useState, useContext } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = () => {
        if (register(username, password)) {
            navigate('/profile');
        } else {
            setError(true);
        }
    };

    return (
        <Box sx={{ p: 4, maxWidth: 400, margin: 'auto' }}>
            <Typography variant="h4" gutterBottom>Регистрация</Typography>
            <TextField
                fullWidth
                label="Имя пользователя"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Пароль"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleRegister} sx={{ mb: 2 }}>
                Зарегистрироваться
            </Button>
            {error && <Alert severity="error" sx={{ mb: 2 }}>Ошибка регистрации</Alert>}
            <Button variant="outlined" fullWidth component={Link} to="/login">
                Вернуться к входу
            </Button>
        </Box>
    );
};

export default RegisterPage;