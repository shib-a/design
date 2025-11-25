
import React, {useContext} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, IconButton, Typography, Badge, Avatar } from '@mui/material';
import { ShoppingCart as CartIcon, AccountCircle as ProfileIcon, Help as SupportIcon } from '@mui/icons-material';

import MainPage from "./pages/MainPage";
import ProfilePage from './pages/ProfilePage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import SupportPage from './pages/SupportPage';
import { DesignProvider } from './DesignContext';
import {CartContext, CartProvider} from "./CartContext";


const Header = () => {
    const { cartItems } = React.useContext(CartContext); // Safe here

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Tiishka
                    </Link>
                </Typography>
                <IconButton color="inherit" component={Link} to="/cart">
                    {cartItems && cartItems.length > 0
                        ? (
                            <Badge badgeContent={cartItems.length} color="secondary">
                                <CartIcon />
                            </Badge>
                        )
                        : (<CartIcon />)
                    }

                </IconButton>
                <IconButton color="inherit" component={Link} to="/profile">
                    <Avatar>
                        <ProfileIcon />
                    </Avatar>
                </IconButton>
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
                <Router>
                    <Box sx={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <Header />

                        <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                            <Routes>
                                <Route path="/" element={<MainPage />} />
                                <Route path="/profile" element={<ProfilePage />} />
                                <Route path="/cart" element={<ShoppingCartPage />} />
                                <Route path="/support" element={<SupportPage />} />
                            </Routes>
                        </Box>
                    </Box>
                </Router>
            </CartProvider>
        </DesignProvider>
    );
};

export default App;