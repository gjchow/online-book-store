import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { SxProps } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import { removeFrom, addToCart } from './lib/cartData';
import CloseIcon from '@mui/icons-material/Close';
import { connect } from 'react-redux';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';


//Taken from https://mui.com/material-ui/react-click-away-listener/#main-content
// @ts-ignore
function CartPreviewModal({ appState, removeOldItem, addNewItem, destroyOldItem, theme }) {
  const [open, setOpen] = React.useState(false);
  const [discount, setDiscount] = React.useState(0);
  const [invalidCode, setInvalidCode] = React.useState(false);
  const [couponCode, setCouponCode] = React.useState("");
  const [helperMessage, sethelperMessage] = React.useState("");

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
    setInvalidCode(false);
    setCouponCode("");
    sethelperMessage("");
  };

  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: theme[30],
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme[30],
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme[30],
      },
      '&:hover fieldset': {
        borderColor: theme[30],
      },
      '&.Mui-focused fieldset': {
        borderColor: theme[30],
      },
    },
  });
  const handleChange = (event: any) => {
    setCouponCode(event.target.value);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const api = process.env.API_URL || "https://assignment-2-12-gjchow-ranachi.herokuapp.com/api";
    let isCouponValid = false;
    await fetch(`${api}/validate-coupon/${couponCode}`)
      .then(res => res.json())
      .then(
        (result) => {
          isCouponValid = result.valid;
        }
      );
      console.log(isCouponValid);


    if(!isCouponValid) {
      setInvalidCode(true);
      sethelperMessage("Invalid Coupon Code");
    } else {
      let applyCode = false;
      await fetch(`${api}/check-coupon/${couponCode}`)
      .then(res => res.json())
      .then(
        (result) => {
          applyCode = result.apply;
        }
      );
      if (!applyCode) {
        setInvalidCode(true);
        sethelperMessage("Can't apply Coupon Code to items in your cart");
      } else {
        let coupons: any[] = [];
        await fetch(`${api}/coupons`)
        .then(res => res.json())
        .then(
          (result) => {
            coupons = result.data;
          }
        );
        const couponResults = coupons.filter(c => c.id === couponCode);
        const coupon = couponResults[0];
        
        if (coupon.discount.type === "DOLLAR") {
          setInvalidCode(false);
          setDiscount(coupon.discount.value);
        }
      }
    }
  }


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

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <IconButton onClick={handleClick}>
          <ShoppingCart sx={{color: theme[60]}}/>
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
            onClose={() => handleClickAway()}
            PaperProps={{
              sx: { width: "95%", maxWidth: 500, backgroundColor: theme[60] },
            }}
          >
            <Box justifyContent={'space-between'} display={'flex'} flexDirection={'column'} height={'100%'}>
              <Box display={'flex'} flexDirection={'column'}>
                <Box width={'100%'} display={'flex'} flexDirection={'column'} sx={{backgroundColor: theme[30]}}>
                  <Typography noWrap gutterBottom variant="h4" component="div" alignSelf={'center'} marginTop={2} color={theme[60]}>
                    My Cart
                  </Typography>
                </Box>
                <Box
                  sx={{  }}
                  role="presentation"
                  // onClick={() => setOpen(false)}
                  // onKeyDown={() => setOpen(false)}
                >
                  <List disablePadding>
                    {appState.map((item: any, index:any) => (
                      <ListItem key={item.name} disablePadding>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} width={'100%'}>
                          <Box width={'100%'} height={0} borderTop={1} marginBottom={1} sx={{ borderColor: theme[30]}}></Box>
                          <Box justifyContent={'space-between'} display={'flex'} width={'100%'}>
                            <Box marginRight={1} marginLeft={1}>
                              <IconButton onClick={() => destroyOldItem(item)} >
                                <CloseIcon sx={{ color: theme[30]}}></CloseIcon>
                              </IconButton>
                            </Box>
                            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} marginRight={1} marginLeft={1}>
                              <Typography noWrap gutterBottom fontSize={'px'} component="div" alignItems={'center'} color={theme[30]}>
                              {item.name}
                              </Typography>
                              <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'row'}>
                                <Box marginTop={-1.25}>
                                  <IconButton onClick={() => removeOldItem(item)} >
                                    <RemoveIcon sx={{ fontSize: '20px', color: theme[30]}}></RemoveIcon>
                                  </IconButton>
                                </Box>
                                <Typography noWrap gutterBottom fontSize={'16px'} component="div" alignItems={'center'} marginTop={-0.5} color={theme[30]}>
                                  {item.quantity}
                                </Typography>
                                <Box marginTop={-1.25}>
                                  <IconButton onClick={() => addNewItem(item)}>
                                    <AddIcon sx={{ fontSize: '20px', color: theme[30]}}></AddIcon>
                                  </IconButton>
                                </Box>
                              </Box>
                            </Box>
                            <Typography noWrap gutterBottom fontSize={'20px'} marginTop={0.5} marginRight={2} marginLeft={1} color={theme[30]}>
                              ${parseFloat(`${item.price * item.quantity}`).toFixed(2)}
                            </Typography>
                          </Box>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
              <Box>
                <Box width={'100%'} height={0} borderTop={1} sx={{ borderColor: theme[30]}}></Box>
                <Box component="form" noValidate autoComplete="off" display={'flex'} justifyContent={'center'} onSubmit={async (e) => await handleSubmit(e)}>
                <CssTextField
                      error={invalidCode}
                      id="coupon-code"
                      label="Coupon Code"
                      margin={'normal'}
                      sx={{width: '95%', borderColor: 'black', alignSelf: 'center'}}
                      helperText={helperMessage}
                      value={couponCode}
                      onChange={handleChange}
                      inputProps={{ style: { borderColor: theme[30]}}}
                    />
                    {/* <Button type="submit">
                        Add Code
                    </Button> */}
                </Box>
                <Box justifyContent={'space-between'} display={'flex'}>
                  <Typography noWrap gutterBottom variant="h5" component="span" marginLeft={2} color={theme[30]}>
                    Subtotal
                  </Typography>
                  <Typography noWrap gutterBottom variant="h5" component="span" marginRight={2} color={theme[30]}>
                    ${parseFloat(`${appState.reduce((a:any, b:any) => (a) + (b.price * b.quantity), 0) }`).toFixed(2)}
                  </Typography>
                </Box>
                <Box justifyContent={'space-between'} display={'flex'}>
                  <Typography noWrap gutterBottom variant="h5" component="span" marginLeft={2} color={theme[30]}>
                    Discount
                  </Typography>
                  <Typography noWrap gutterBottom variant="h5" component="span" marginRight={2} color={'red'}>
                    -${parseFloat(`${discount}`).toFixed(2)}
                  </Typography>
                </Box>
                <Box justifyContent={'space-between'} display={'flex'}>
                  <Typography noWrap gutterBottom variant="h5" component="span" marginLeft={2} color={theme[30]}>
                    HST 13%
                  </Typography>
                  <Typography noWrap gutterBottom variant="h5" component="span" marginRight={2} color={theme[30]}>
                    ${parseFloat(`${(appState.reduce((a:any, b:any) => (a) + (b.price * b.quantity), 0) - discount) * 0.13}`).toFixed(2)}
                  </Typography>
                </Box>
                <Box justifyContent={'space-between'} display={'flex'}>
                  <Typography noWrap gutterBottom variant="h5" component="span" marginLeft={2} color={theme[30]}>
                    Total
                  </Typography>
                  <Typography noWrap gutterBottom variant="h5" component="span" marginRight={2} color={theme[30]}>
                  ${parseFloat(`${(appState.reduce((a:any, b:any) => (a) + (b.price * b.quantity), 0) - discount) * 1.13}`).toFixed(2)}
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
  addNewItem: (item: any) => dispatch({ type: "ADD_ITEM", item}),
  removeOldItem: (item: any) => dispatch({ type: "REMOVE_ITEM", item}),
  destroyOldItem: (item: any) => dispatch({ type: "DESTROY_ITEM", item}),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPreviewModal);
