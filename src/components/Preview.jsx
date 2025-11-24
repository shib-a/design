// TShirtPreview.jsx (updated with tint filter for dynamic coloring and debugging)
import React, { useRef, useEffect, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { fabric } from 'fabric';
import { DesignContext } from '../DesignContext';

const Preview = () => {
    const { designState, updateDesignElement } = useContext(DesignContext);
    const canvasRef = useRef(null);
    const fabricCanvas = useRef(null);

    useEffect(() => {
        // Initialize fabric canvas without backgroundColor
        fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
            width: 600, // Adjust as needed
            height: 800,
        });

        // Use your local image from /public (adjust path if in a subfolder, e.g., '/assets/white-shirt-mockup.png')
        const baseShirtSrc = '/white_front.png'; // Relative path to public folder

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

            // Apply tint filter for dynamic shirt color
            const tintFilter = new fabric.Image.filters.BlendColor({
                color: designState.color,
                mode: 'tint',
                alpha: 1,
            });
            img.filters = [tintFilter];
            img.applyFilters();

            // Scale to fit (contain) while preserving aspect ratio
            const canvasWidth = fabricCanvas.current.width;
            const canvasHeight = fabricCanvas.current.height;
            const imgAspect = img.width / img.height;
            const canvasAspect = canvasWidth / canvasHeight;

            let scale = 1;
            if (imgAspect > canvasAspect) {
                scale = canvasHeight / img.height;
            } else {
                scale = canvasWidth / img.width;
            }

            img.set({
                scaleX: scale,
                scaleY: scale,
                originX: 'left', // Adjusted for top-left alignment (change to 'center' if needed)
                originY: 'top',
                left: 0,
                top: 0,
                selectable: false,
            });

            fabricCanvas.current.setBackgroundImage(img, () => {
                fabricCanvas.current.renderAll(); // Explicit redraw
                console.log('Background image loaded, tinted, and rendered successfully');
            });
        }, {
            crossOrigin: 'anonymous', // Optional now for local images, but harmless
        });

        // Cleanup on unmount
        return () => {
            fabricCanvas.current.dispose();
        };
    }, [designState.color]); // Re-init on color change

    useEffect(() => {
        // Clear existing designs
        fabricCanvas.current.remove(...fabricCanvas.current.getObjects());

        // Add designs as fabric objects
        designState.designs.forEach((design) => {
            fabric.Image.fromURL(design.src, (img) => {
                img.set({
                    left: design.left || 100,
                    top: design.top || 100,
                    scaleX: design.scaleX || 1,
                    scaleY: design.scaleY || 1,
                    angle: design.angle || 0,
                    selectable: true,
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

        fabricCanvas.current.renderAll(); // Ensure redraw after adding designs
    }, [designState.designs]);

    // Optional: Slight scale based on size
    const scale = { S: 0.9, M: 1, L: 1.1, XL: 1.2 }[designState.size] || 1;

    return (
        <Box
            sx={{
                width: '50%',
                borderRight: '1px solid #ddd',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f9f9f9',
                p: 2,
                overflowY: 'auto',
            }}
        >
            <div style={{ transform: `scale(${scale})`, transition: 'transform 0.3s ease', transformOrigin: 'center' }}>
                <canvas ref={canvasRef} style={{ border: '1px solid red' /* for debugging */ }} />
            </div>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Size: {designState.size}
            </Typography>
        </Box>
    );
};

export default Preview;