import React, {createContext, useContext, useState} from 'react';
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
    Avatar, Button, Stack,
} from '@mui/material';
import {
    AutoFixHigh as GenerationIcon,
    ShoppingBag as ItemIcon,
    Image as ImagesIcon,
    Refresh as ResetIcon,
} from '@mui/icons-material';

import GenerationSection from '../components/GenerationSection'; // Extracted Generation content
import ItemSection from '../components/ItemSection'; // Placeholder
import ImagesSection from '../components/ImageSection'; // Placeholder
import Preview from '../components/Preview';
import {DesignContext} from "../DesignContext";
import { CartContext } from '../CartContext';

const MainPage = () => {
    const [openTabs, setOpenTabs] = useState([]);
    const { updateDesign } = useContext(DesignContext);
    const { designState } = useContext(DesignContext);
    const { addToCart } = useContext(CartContext); // New

    const toggleTab = (tab) => {
        setOpenTabs((prev) =>
            prev.includes(tab) ? prev.filter((t) => t !== tab) : [...prev, tab]
        );
    };

    const resetTabs = () => {
        setOpenTabs([]);
    };

    const resetDesign = () => {
        updateDesign({
            color: '#ffffff',
            size: 'M',
            designs: [],
        });
    };

    const handleAddToCart = () => {
        addToCart(designState); // Add current design state to cart
    };

    const renderContent = () => {
        if (openTabs.length === 0) {
            return <Typography sx={{ p: 2 }}>No sections open. Select from the sidebar.</Typography>;
        }

        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    overflowY: 'auto',
                    gap: 2,
                }}
            >
                {openTabs.map((tab) => (
                    <Box
                        key={tab}
                        sx={{
                            flex: openTabs.length > 1 ? `1 1 ${100 / openTabs.length}%` : '1 1 100%',
                            border: '1px solid #ddd',
                            borderRadius: 2,
                            p: 2,
                            overflowY: 'auto',
                            backgroundColor: '#fff',
                        }}
                    >
                        <Typography variant="h6" gutterBottom>{tab} Section</Typography>
                        {tab === 'Generation' && <GenerationSection />}
                        {tab === 'Item' && <ItemSection />}
                        {tab === 'Images' && <ImagesSection />}
                    </Box>
                ))}
            </Box>
        );
    };

    return (
        <Box sx={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
            {/* Sidebar */}
            <Box
                sx={{
                    width: 200,
                    borderRight: '1px solid #ddd',
                    backgroundColor: '#f0f0f0',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <List component="nav" sx={{ flexGrow: 1 }}>
                    <ListItemButton selected={openTabs.includes('Generation')} onClick={() => toggleTab('Generation')}>
                        <ListItemIcon><GenerationIcon /></ListItemIcon>
                        <ListItemText primary="Generation" />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton selected={openTabs.includes('Item')} onClick={() => toggleTab('Item')}>
                        <ListItemIcon><ItemIcon /></ListItemIcon>
                        <ListItemText primary="Item" />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton selected={openTabs.includes('Images')} onClick={() => toggleTab('Images')}>
                        <ListItemIcon><ImagesIcon /></ListItemIcon>
                        <ListItemText primary="Images" />
                    </ListItemButton>
                </List>

                {/* Bottom Buttons */}
                <Stack spacing={2} sx={{ p: 2 }}>
                    <Button variant="outlined" color="secondary" onClick={resetTabs}>
                        Reset Tabs
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<ResetIcon />}
                        onClick={resetDesign}
                    >
                        Reset Design
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </Button> {/* New "Add to Cart" button */}
                </Stack>
            </Box>

            {/* Main Content Area */}
            <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
                <Box sx={{ width: '50%', overflowY: 'auto', p: 2 }}>
                    {renderContent()}
                </Box>
                <Preview />
            </Box>
        </Box>
    );
};

export default MainPage;