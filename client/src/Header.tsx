import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CartPreviewModal from './CartPreviewModal';

//Taken from https://mui.com/material-ui/react-app-bar/#main-content
export default function Header() {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
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
