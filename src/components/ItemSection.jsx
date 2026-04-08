import React, { useContext } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { DesignContext } from '../DesignContext';

const ItemSection = () => {
    const { designState, updateDesign } = useContext(DesignContext);

    const handleColorChange = (event, newColor) => {
        if (newColor) {
            updateDesign({ color: newColor });
        }
    };

    const handleSizeChange = (event) => {
        updateDesign({ size: event.target.value });
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>Item Settings</Typography>

            {/* Color Selection (White and Black stubs) */}
            <Typography variant="h6" gutterBottom>T-shirt Color</Typography>
            <ToggleButtonGroup
                value={designState.color}
                exclusive
                onChange={handleColorChange}
                aria-label="shirt color"
            >
                <ToggleButton value="#ffffff" aria-label="white" sx={{ backgroundColor: '#ffffff', border: '1px solid #ddd' }}>
                    White
                </ToggleButton>
                <ToggleButton value="#000000" aria-label="black" sx={{ backgroundColor: '#000000', color: '#ffffff' }}>
                    Black
                </ToggleButton>
            </ToggleButtonGroup>

            {/* Size Selection (Dropdown, no preview effect needed) */}
            <FormControl fullWidth sx={{ mt: 3 }}>
                <InputLabel>T-shirt Size</InputLabel>
                <Select value={designState.size} onChange={handleSizeChange}>
                    <MenuItem value="S">Small (S)</MenuItem>
                    <MenuItem value="M">Medium (M)</MenuItem>
                    <MenuItem value="L">Large (L)</MenuItem>
                    <MenuItem value="XL">Extra Large (XL)</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default ItemSection;