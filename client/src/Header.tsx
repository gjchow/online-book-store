import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CartPreviewModal from './CartPreviewModal';

//Taken from https://mui.com/material-ui/react-app-bar/#main-content
export default function Header(props: any) {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 3, backgroundColor: props.theme[30] }}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: props.theme[10] }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color={props.theme[60]}>
            CSC304 Shopping
          </Typography>
          <CartPreviewModal theme={props.theme}></CartPreviewModal>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
