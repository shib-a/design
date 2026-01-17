import React, { useRef, useEffect, useContext } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { ShoppingCart as CartIcon } from '@mui/icons-material';
import { fabric } from 'fabric';
import { DesignContext } from '../DesignContext';
import { CartContext } from '../CartContext';

const Preview = () => {
    const { designState, updateDesignElement } = useContext(DesignContext);
    const { addToCart } = useContext(CartContext);
    const canvasRef = useRef(null);
    const fabricCanvas = useRef(null);

    const handleAddToCart = () => {
        addToCart(designState);
    };

    useEffect(() => {
        // Initialize fabric canvas
        fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
            width: 800,
            height: 800, // Adjusted to better match shirt proportions
        });

        // Load base shirt PNG
        const baseShirtSrc = '/white_front_1.png'; // Your existing local PNG
        fabric.Image.fromURL(baseShirtSrc, (img) => {
            if (!img) {
                console.error('Failed to load image from:', baseShirtSrc);
                const fallbackText = new fabric.Text('Image Load Failed', {
                    left: 100,
                    top: 100,
                    fill: 'red',
                });
                fabricCanvas.current.add(fallbackText);
                fabricCanvas.current.renderAll();
                return;
            }

            // Apply multiply blend for dynamic coloring
            const colorFilter = new fabric.Image.filters.BlendColor({
                color: designState.color,
                mode: 'multiply',
                alpha: 1,
            });
            img.filters = [colorFilter];
            img.applyFilters();

            // Scale to fill height (cover vertically, crop sides if needed)
            const canvasWidth = fabricCanvas.current.width;
            const canvasHeight = fabricCanvas.current.height;

            const scale = canvasHeight / img.height; // Prioritize filling height
            const scaledWidth = img.width * scale;

            img.set({
                scaleX: scale,
                scaleY: scale,
                originX: 'left',
                originY: 'top',
                left: (canvasWidth - scaledWidth) / 2, // Center horizontally; negative if cropping needed for symmetric crop
                top: 0,
                selectable: false,
            });

            // Log for debugging
            console.log('img dimensions:', img.width, img.height);
            console.log('canvas dimensions:', canvasWidth, canvasHeight);
            console.log('scale:', scale);
            console.log('scaled size:', scaledWidth, scale * img.height);
            console.log('calculated left:', img.left);

            fabricCanvas.current.setBackgroundImage(img, () => {
                fabricCanvas.current.renderAll();
                console.log('Background image loaded, colored, and rendered successfully');
            });
        }, { crossOrigin: 'anonymous' });

        // Cleanup
        return () => {
            fabricCanvas.current.dispose();
        };
    }, [designState.color]);

    useEffect(() => {
        // Clear and add designs
        fabricCanvas.current.remove(...fabricCanvas.current.getObjects());

        designState.designs.forEach((design) => {
            fabric.Image.fromURL(design.src, (img) => {
                img.set({
                    left: design.left || 100,
                    top: design.top || 100,
                    scaleX: design.scaleX || 1,
                    scaleY: design.scaleY || 1,
                    angle: design.angle || 0,
                    selectable: true,
                    borderColor: '#2196f3',
                    cornerColor: '#2196f3',
                    cornerSize: 12,
                    transparentCorners: false,
                    borderScaleFactor: 3,
                    padding: 5,
                });

                img.on('modified', () => {
                    updateDesignElement(design.id, {
                        left: img.left,
                        top: img.top,
                        scaleX: img.scaleX,
                        scaleY: img.scaleY,
                        angle: img.angle,
                    });
                });

                fabricCanvas.current.add(img);
            });
        });

        fabricCanvas.current.renderAll();
    }, [designState.designs, updateDesignElement]);

    // Size scale (unchanged)
    const scale = { S: 0.9, M: 1, L: 1.1, XL: 1.2 }[designState.size] || 1;

    return (
        <Box
            sx={{
                width: '50%',
                borderRight: '1px solid #ddd',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: '#f9f9f9',
                p: 2,
                overflowY: 'auto',
            }}
        >
            <div style={{ transform: `scale(${scale})`, transition: 'transform 0.3s ease', transformOrigin: 'top center' }}>
                <canvas ref={canvasRef}/>
            </div>
            <Stack spacing={2} sx={{ mt: 2, width: '100%', maxWidth: 400 }} alignItems="center">
                <Typography variant="subtitle1">
                    Размер: {designState.size}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<CartIcon />}
                    onClick={handleAddToCart}
                    sx={{
                        fontSize: '1.2rem',
                        py: 1.5,
                        px: 4,
                        width: '100%',
                    }}
                >
                    Добавить в корзину
                </Button>
            </Stack>
        </Box>
    );
};

export default Preview;