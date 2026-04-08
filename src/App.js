// App.jsx (updated with AuthProvider and dynamic header)
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, IconButton, Typography, Badge, Avatar, Button } from '@mui/material';
import { ShoppingCart as CartIcon, AccountCircle as ProfileIcon, Help as SupportIcon, Login as LoginIcon } from '@mui/icons-material';

import DesignerPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import SupportPage from './pages/SupportPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { DesignProvider } from './DesignContext';
import {CartContext, CartProvider} from './CartContext';
import { AuthProvider, AuthContext } from './AuthContext';

const Header = () => {
    const { cartItems } = React.useContext(CartContext);
    const { user } = React.useContext(AuthContext);

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Tiishka
                    </Link>
                </Typography>
                <IconButton color="inherit" component={Link} to="/cart">
                    <Badge badgeContent={cartItems.length} color="secondary">
                        <CartIcon />
                    </Badge>
                </IconButton>
                {user ? (
                    <IconButton color="inherit" component={Link} to="/profile">
                        <Avatar>
                            <ProfileIcon />
                        </Avatar>
                    </IconButton>
                ) : (
                    <Button color="inherit" component={Link} to="/login" startIcon={<LoginIcon />}>
                        Log In
                    </Button>
                )}
                <IconButton color="inherit" component={Link} to="/support">
                    <SupportIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

const App = () => {
    return (
        <DesignProvider>
            <CartProvider>
                <AuthProvider>
                    <Router>
                        <Box sx={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <Header />

                            <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                                <Routes>
                                    <Route path="/" element={<DesignerPage />} />
                                    <Route path="/profile" element={<ProfilePage />} />
                                    <Route path="/cart" element={<ShoppingCartPage />} />
                                    <Route path="/support" element={<SupportPage />} />
                                    <Route path="/login" element={<LoginPage />} />
                                    <Route path="/register" element={<RegisterPage />} />
                                </Routes>
                            </Box>
                        </Box>
                    </Router>
                </AuthProvider>
            </CartProvider>
        </DesignProvider>
    );
};

export default App;