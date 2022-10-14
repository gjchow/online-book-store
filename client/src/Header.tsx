import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import CartPreviewModal from './CartPreviewModal';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CSC304 Shopping
          </Typography>
          <CartPreviewModal></CartPreviewModal>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
