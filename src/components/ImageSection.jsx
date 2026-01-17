import React, { useContext } from 'react';
import { Box, Typography, Button, Input } from '@mui/material';
import { DesignContext } from '../DesignContext';

const ImagesSection = () => {
    const { addDesign } = useContext(DesignContext);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                addDesign({ src: e.target.result }); // Add as base64 URL
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4">Мои дизайны</Typography>
            <Typography gutterBottom>Выберите или загрузите изображение для добавления в дизайн.</Typography>
            <Input type="file" accept="image/*" onChange={handleImageUpload} sx={{ mb: 2 }} />
            {/* Add more: e.g., gallery of pre-selected images */}
            <Button variant="contained" component="label">
                Загрузить изображение
                <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
            </Button>
        </Box>
    );
};

export default ImagesSection;