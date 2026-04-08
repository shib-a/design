// SupportPage.jsx (updated with simple question submission form)
import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, TextField, Button, Alert } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const SupportPage = () => {
    const [question, setQuestion] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for submission logic (e.g., send to API or email)
        console.log('Submitted question:', question);
        setSubmitted(true);
        setQuestion('');
    };

    return (
        <Box sx={{ p: 4, maxWidth: 800, margin: 'auto' }}>
            <Typography variant="h4" gutterBottom>Support</Typography>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>How to create a t-shirt design?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Use designer tools to add prompts, images, text, and more.</Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>What payment methods are accepted?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>We accept credit cards and SBP.</Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>How to contact support?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Email us at support@tiishka.com.</Typography>
                </AccordionDetails>
            </Accordion>

            {/* Simple Question Submission Form */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>Ask a question</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Your question"
                        variant="outlined"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Submit
                    </Button>
                </form>
                {submitted && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        Your question has been sent! We will contact you shortly.
                    </Alert>
                )}
            </Box>
        </Box>
    );
};

export default SupportPage;