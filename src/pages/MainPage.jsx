import React, { createContext, useState } from 'react';
import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Badge,
    Avatar,
} from '@mui/material';
import {
    Terminal as PromptIcon,
    ShoppingBag as ProductIcon,
    Image as ImagesIcon,
    AccountCircle as ProfileIcon,
    ShoppingCart as CartIcon,
} from '@mui/icons-material';

import GenerationSection from '../components/GenerationSection'; // Extracted Generation content
import ItemSection from '../components/ItemSection'; // Placeholder
import ImagesSection from '../components/ImageSection'; // Placeholder
import Preview from '../components/Preview';

const MainPage = () => {
    const [selectedTab, setSelectedTab] = useState('Generation');

    const renderContent = () => {
        switch (selectedTab) {
            case 'Generation':
                return <GenerationSection />;
            case 'Product':
                return <ItemSection />;
            case 'Images':
                return <ImagesSection />;
            default:
                return null;
        }
    };

    return (
        <Box sx={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Top Header */}
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        GenAIWear Designer
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={3} color="secondary">
                            <CartIcon />
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit">
                        <Avatar>
                            <ProfileIcon />
                        </Avatar>
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Main Layout */}
            <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
                {/* Sidebar */}
                <Box
                    sx={{
                        width: 200,
                        borderRight: '1px solid #ddd',
                        backgroundColor: '#f0f0f0',
                        overflowY: 'auto',
                    }}
                >
                    <List component="nav">
                        <ListItemButton selected={selectedTab === 'Prompt'} onClick={() => setSelectedTab('Prompt')}>
                            <ListItemIcon><PromptIcon /></ListItemIcon>
                            <ListItemText primary="Prompt" />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton selected={selectedTab === 'Product'} onClick={() => setSelectedTab('Product')}>
                            <ListItemIcon><ProductIcon /></ListItemIcon>
                            <ListItemText primary="Product" />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton selected={selectedTab === 'Images'} onClick={() => setSelectedTab('Images')}>
                            <ListItemIcon><ImagesIcon /></ListItemIcon>
                            <ListItemText primary="Images" />
                        </ListItemButton>
                        <Divider />
                    </List>
                </Box>

                {/* Main Content Area with Preview and Controls */}
                <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
                    {/* T-Shirt Preview (Persistent) */}
                   <Preview/>

                    {/* Section-Specific Controls (Scrollable) */}
                    <Box sx={{ width: '50%', overflowY: 'auto', p: 2 }}>
                        {renderContent()}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MainPage;