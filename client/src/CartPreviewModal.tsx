import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { SxProps } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import { getItems, removeFrom, addToCart } from './lib/cartData';
import CloseIcon from '@mui/icons-material/Close';
import { connect } from 'react-redux';
import Typography from '@mui/material/Typography';

//Taken from https://mui.com/material-ui/react-click-away-listener/#main-content
// @ts-ignore
function CartPreviewModal({ appState, removeOldItem }) {
  const [open, setOpen] = React.useState(false);
  // const [cartItems, setItems] = React.useState(getItems());

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  // const styles: SxProps = {
  //   position: 'fixed',
  //   width: '20%',
  //   top: 64,
  //   left: '80%',
  //   border: '1px solid',
  //   minHeight: '40%',
  //   p: 1,
  //   bgcolor: 'background.paper',
  // };

  console.log(appState);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <IconButton onClick={handleClick}>
          <ShoppingCart/>
        </IconButton>
        {/* {open ? (
          <Portal>
            <Box sx={styles}>
              Currently no items.
            </Box>
          </Portal>
        ) : null} */}
         <Drawer
            anchor={'right'}
            open={open}
            onClose={() => setOpen(false)}
          >
            <Box justifyContent={'space-between'} display={'flex'} flexDirection={'column'} height={'100%'}>
              <Box display={'flex'} flexDirection={'column'}>
            <Typography noWrap gutterBottom variant="h3" component="div" alignSelf={'center'} marginTop={2}>
              My Cart
            </Typography>
            <Box
              sx={{ width: 500 }}
              role="presentation"
              // onClick={() => setOpen(false)}
              // onKeyDown={() => setOpen(false)}
            >
              <List>
                {appState.map((item:any, index:any) => (
                  <ListItem key={item.name} disablePadding>
                    <Box justifyContent={'space-between'} display={'flex'} width={'100%'}>
                      <Box marginLeft={1}>
                        <IconButton onClick={() => removeOldItem(item)} >
                          <CloseIcon></CloseIcon>
                        </IconButton>
                      </Box>
                      <Typography noWrap gutterBottom fontSize={'20px'} component="span" marginTop={0.5}>
                        {item.name}
                      </Typography>
                      <Typography noWrap gutterBottom fontSize={'20px'} component="span" marginTop={0.5} marginRight={2}>
                        {item.price}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
            </Box>
            <Box>
              <Box justifyContent={'space-between'} display={'flex'}>
                <Typography noWrap gutterBottom variant="h5" component="span" marginLeft={2}>
                  Subtotal
                </Typography>
                <Typography noWrap gutterBottom variant="h5" component="span" marginRight={2}>
                  $0.00
                </Typography>
              </Box>
              <Box justifyContent={'space-between'} display={'flex'}>
                <Typography noWrap gutterBottom variant="h5" component="span" marginLeft={2}>
                  Discount
                </Typography>
                <Typography noWrap gutterBottom variant="h5" component="span" marginRight={2} color={'red'}>
                  -$0.00
                </Typography>
              </Box>
              <Box justifyContent={'space-between'} display={'flex'}>
                <Typography noWrap gutterBottom variant="h5" component="span" marginLeft={2}>
                  HST 13%
                </Typography>
                <Typography noWrap gutterBottom variant="h5" component="span" marginRight={2}>
                  $0.00
                </Typography>
              </Box>
              <Box justifyContent={'space-between'} display={'flex'}>
                <Typography noWrap gutterBottom variant="h5" component="span" marginLeft={2}>
                  Total
                </Typography>
                <Typography noWrap gutterBottom variant="h5" component="span" marginRight={2}>
                  $0.00
                </Typography>
              </Box>
            </Box>
            </Box>
          </Drawer>
      </div>
    </ClickAwayListener>
  );
}

const mapStateToProps = (state: any) => ({
  appState: state,
});

const mapDispatchToProps = (dispatch: any) => ({
  addNewItem: (item: any) => dispatch(addToCart(item)),
  removeOldItem: (item: any) => dispatch(removeFrom(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPreviewModal);
