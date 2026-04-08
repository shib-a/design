import React, {useContext, useState} from 'react';
import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Typography,
    Button, Stack,
} from '@mui/material';
import {
    AutoFixHigh as GenerationIcon,
    ShoppingBag as ItemIcon,
    Image as ImagesIcon,
    Refresh as ResetIcon,
    ExpandLess,
    ExpandMore,
} from '@mui/icons-material';

import GenerationSection from '../components/GenerationSection';
import ItemSection from '../components/ItemSection';
import ImagesSection from '../components/ImageSection';
import Preview from '../components/Preview';
import {DesignContext} from "../DesignContext";
const MainPage = () => {
    const [openTab, setOpenTab] = useState("Generation"); // Changed to single tab
    const { updateDesign } = useContext(DesignContext);

    const toggleTab = (tab) => {
        // Only one tab can be open at a time
        setOpenTab((prev) => prev === tab ? null : tab);
    };


    const resetDesign = () => {
        updateDesign({
            color: '#ffffff',
            size: 'M',
            designs: [],
        });
    };

    const renderContent = () => {
        if (!openTab) {
            return <Typography sx={{ p: 2 }}>Select a section on the sidebar</Typography>;
        }

        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    overflowY: 'auto',
                    p: 2,
                }}
            >
                <Box
                    sx={{
                        border: '1px solid #ddd',
                        borderRadius: 2,
                        p: 2,
                        backgroundColor: '#fff',
                    }}
                >
                    {openTab === 'Generation' && <GenerationSection />}
                    {openTab === 'Item' && <ItemSection />}
                    {openTab === 'Images' && <ImagesSection />}
                </Box>
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
                    <ListItemButton selected={openTab === 'Generation'} onClick={() => toggleTab('Generation')}>
                        <ListItemIcon><GenerationIcon /></ListItemIcon>
                        <ListItemText primary="Generation" />
                        {openTab === 'Generation' ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Divider />

                    <ListItemButton selected={openTab === 'Item'} onClick={() => toggleTab('Item')}>
                        <ListItemIcon><ItemIcon /></ListItemIcon>
                        <ListItemText primary="Item" />
                        {openTab === 'Item' ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Divider />

                    <ListItemButton selected={openTab === 'Images'} onClick={() => toggleTab('Images')}>
                        <ListItemIcon><ImagesIcon /></ListItemIcon>
                        <ListItemText primary="My Designs" />
                        {openTab === 'Images' ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </List>

                {/* Bottom Buttons */}
                <Stack spacing={2} sx={{ p: 2 }}>
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<ResetIcon />}
                        onClick={resetDesign}
                    >
                        Reset Design
                    </Button>
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