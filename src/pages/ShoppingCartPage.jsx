import React, { useContext } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, IconButton, Stack } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { CartContext } from '../CartContext';

const ShoppingCartPage = () => {
    const { cartItems, updateQuantity, removeItem } = useContext(CartContext);

    const total = cartItems.reduce((sum, item) => sum + 20 * item.quantity, 0);

    return (
        <Box sx={{ p: 4, maxWidth: 800, margin: 'auto' }}>
            <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
            <List>
                {cartItems.map((item) => (
                    <ListItem key={item.id} secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => removeItem(item.id)}>
                            <DeleteIcon />
                        </IconButton>
                    }>
                        <ListItemText
                            primary={`Custom T-Shirt (Color: ${item.designState.color}, Size: ${item.designState.size})`}
                            secondary={`Quantity: ${item.quantity} - Price: $${25 * item.quantity}`}
                        />
                        <Stack direction="row" spacing={1} sx={{ ml: 2 }}>
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
            <Typography variant="h6" sx={{ mt: 2 }}>Total: ${total.toFixed(2)}</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>Checkout</Button>
        </Box>
    );
};

export default ShoppingCartPage;