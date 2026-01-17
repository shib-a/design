import React, { useContext, useRef, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, IconButton, Stack, Card, CardMedia } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { CartContext } from '../CartContext';
import { fabric } from 'fabric';

// Component to render a preview of the design
const DesignPreview = ({ designState }) => {
    const canvasRef = useRef(null);
    const fabricCanvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Initialize fabric canvas with smaller size for preview
        fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
            width: 200,
            height: 200,
            selection: false,
        });

        // Load base shirt
        const baseShirtSrc = '/white_front_1.png';
        fabric.Image.fromURL(baseShirtSrc, (img) => {
            if (!img) return;

            const colorFilter = new fabric.Image.filters.BlendColor({
                color: designState.color,
                mode: 'multiply',
                alpha: 1,
            });
            img.filters = [colorFilter];
            img.applyFilters();

            const scale = 200 / img.height;
            const scaledWidth = img.width * scale;

            img.set({
                scaleX: scale,
                scaleY: scale,
                originX: 'left',
                originY: 'top',
                left: (200 - scaledWidth) / 2,
                top: 0,
                selectable: false,
            });

            fabricCanvasRef.current.setBackgroundImage(img, () => {
                fabricCanvasRef.current.renderAll();
            });
        }, { crossOrigin: 'anonymous' });

        designState.designs.forEach((design) => {
            fabric.Image.fromURL(design.src, (img) => {
                const scale = 200 / 800; // Scale down from original canvas size
                img.set({
                    left: (design.left || 100) * scale,
                    top: (design.top || 100) * scale,
                    scaleX: (design.scaleX || 1) * scale,
                    scaleY: (design.scaleY || 1) * scale,
                    angle: design.angle || 0,
                    selectable: false,
                });
                fabricCanvasRef.current.add(img);
                fabricCanvasRef.current.renderAll();
            });
        });

        return () => {
            if (fabricCanvasRef.current) {
                fabricCanvasRef.current.dispose();
            }
        };
    }, [designState]);

    return (
        <Box sx={{ border: '1px solid #ddd', borderRadius: 1, overflow: 'hidden' }}>
            <canvas ref={canvasRef} />
        </Box>
    );
};

const ShoppingCartPage = () => {
    const { cartItems, updateQuantity, removeItem } = useContext(CartContext);

    const total = cartItems.reduce((sum, item) => sum + 2000 * item.quantity, 0);

    return (
        <Box sx={{ p: 4, maxWidth: 1000, margin: 'auto' }}>
            <Typography variant="h4" gutterBottom>Корзина</Typography>
            <List>
                {cartItems.map((item) => (
                    <ListItem
                        key={item.id}
                        sx={{
                            mb: 2,
                            border: '1px solid #ddd',
                            borderRadius: 2,
                            alignItems: 'flex-start',
                        }}
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => removeItem(item.id)}>
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <Box sx={{ mr: 2, mt: 1 }}>
                            <DesignPreview designState={item.designState} />
                        </Box>
                        <ListItemText
                            primary={`Кастомная футболка (Цвет: ${item.designState.color}, Размер: ${item.designState.size})`}
                            secondary={`Количество: ${item.quantity} - Цена: ₽${(2000 * item.quantity).toFixed(2)}`}
                            sx={{ flex: 1 }}
                        />
                        <Stack direction="row" spacing={1} sx={{ ml: 2, alignItems: 'center', mt: 1 }}>
                            <IconButton onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1}>
                                <RemoveIcon />
                            </IconButton>
                            <Typography variant="body1">{item.quantity}</Typography>
                            <IconButton onClick={() => updateQuantity(item.id, 1)}>
                                <AddIcon />
                            </IconButton>
                        </Stack>
                    </ListItem>
                ))}
            </List>
            <Typography variant="h6" sx={{ mt: 2 }}>Итого: ₽{total.toFixed(2)}</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>Оформить заказ</Button>
        </Box>
    );
};

export default ShoppingCartPage;