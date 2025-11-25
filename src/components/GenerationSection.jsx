import React, { useState, useContext } from 'react';
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, Alert } from '@mui/material';
import { DesignContext } from '../DesignContext';

const GenerationSection = () => {
    const { addDesign } = useContext(DesignContext); // Use addDesign from context
    const [prompt, setPrompt] = useState('');
    const [text, setText] = useState('');
    const [aiAgent, setAiAgent] = useState('Ideogram');
    const [variations, setVariations] = useState(2);
    const [quality, setQuality] = useState('Premium');

    const handleSubmit = () => {
        console.log({ prompt, text, aiAgent, variations, quality });
    };

    const handleRandomDesign = () => {
        const randomImages = [
            '/i.webp',
        ];
        const randomSrc = randomImages[Math.floor(Math.random() * randomImages.length)];

        addDesign({ src: randomSrc }); // Add to preview
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>Generation Section</Typography>

            {/* Design Prompt */}
            <TextField
                fullWidth
                label="Design Prompt"
                variant="outlined"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                sx={{ mb: 2 }}
            />

            {/* Text (optional) */}
            <TextField
                fullWidth
                label="Text (optional)"
                variant="outlined"
                value={text}
                onChange={(e) => setText(e.target.value)}
                sx={{ mb: 2 }}
            />

            {/* Generative AI Agent Selection */}
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Generative AI Agent</InputLabel>
                <Select value={aiAgent} onChange={(e) => setAiAgent(e.target.value)}>
                    <MenuItem value="Ideogram">Ideogram</MenuItem>
                    <MenuItem value="GPT-40">GPT-40</MenuItem>
                </Select>
            </FormControl>

            {/* Amount of Generations */}
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Amount of Generations</InputLabel>
                <Select value={variations} onChange={(e) => setVariations(e.target.value)}>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                </Select>
            </FormControl>

            {/* Quality of Generation */}
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Quality</InputLabel>
                <Select value={quality} onChange={(e) => setQuality(e.target.value)}>
                    <MenuItem value="Draft">Draft</MenuItem>
                    <MenuItem value="Premium">Premium</MenuItem>
                    <MenuItem value="Ultra">Ultra</MenuItem>
                </Select>
            </FormControl>

            {/* Submit Button */}
            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} sx={{ mb: 2 }}>
                Generate
            </Button>

            {/* Random Design Button */}
            <Button variant="outlined" color="secondary" fullWidth onClick={handleRandomDesign}>
                Random Design
            </Button>

            {/* Optional Alert */}
            <Alert severity="info" sx={{ mt: 2 }}>
                Generations may take time based on quality selected.
            </Alert>
        </Box>
    );
};

export default GenerationSection;