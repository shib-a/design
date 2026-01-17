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
            <Typography variant="h4" gutterBottom>Поддержка</Typography>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Как создать дизайн футболки?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Используйте инструменты дизайнера для добавления подсказок, изображений, текста и многого другого.</Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Какие способы оплаты принимаются?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Мы принимаем кредитные карты и CБП.</Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Как связаться с поддержкой?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Напишите нам на support@tiishka.com.</Typography>
                </AccordionDetails>
            </Accordion>

            {/* Simple Question Submission Form */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>Задать вопрос</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Ваш вопрос"
                        variant="outlined"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Отправить
                    </Button>
                </form>
                {submitted && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        Ваш вопрос отправлен! Мы свяжемся с вами в ближайшее время.
                    </Alert>
                )}
            </Box>
        </Box>
    );
};

export default SupportPage;