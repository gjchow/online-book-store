import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import IconButton from '@mui/material/IconButton';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import { connect } from 'react-redux';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TextField from '@mui/material/TextField';


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

    if(!isCouponValid) {
      setInvalidCode(true);
      sethelperMessage("Invalid Coupon Code");
    } else {
      let applyCode = false;
      await fetch(`${api}/check-coupon/${couponCode}`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemNames: appState.map((i: any) => i.name)})
      })
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
        let coupon: any = {};
        await fetch(`${api}/coupon/${couponCode}`)
        .then(res => res.json())
        .then(
          (result) => {
            coupon = result.data;
          }
        );
        
        if (coupon.discount.type === "DOLLAR") {
          setInvalidCode(false);
          sethelperMessage("");
          setDiscount(coupon.discount.value);
        }
      }
    }
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <IconButton data-testid="shoppingCartBtn" onClick={handleClick}>
          <ShoppingCart  sx={{color: theme[60]}}/>
        </IconButton>
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
                <Box width={'100%'} display={'flex'} flexDirection={'column'} sx={{backgroundColor: theme[10]}}>
                  <Typography noWrap gutterBottom variant="h4" component="div" alignSelf={'center'} marginTop={2} color={theme[60]}>
                    My Cart
                  </Typography>
                </Box>
                <Box
                  sx={{  }}
                  role="presentation"
                >
                  <List disablePadding>
                    {appState.map((item: any, index:any) => (
                      <ListItem key={item.name} disablePadding>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} width={'100%'}>
                          <Box width={'100%'} height={0} borderTop={1} marginBottom={1} sx={{ borderColor: theme[10]}}></Box>
                          <Box justifyContent={'space-between'} display={'flex'} width={'100%'}>
                            <Box marginRight={1} marginLeft={1}>
                              <IconButton onClick={() => destroyOldItem(item)} >
                                <CloseIcon sx={{ color: theme[10]}}></CloseIcon>
                              </IconButton>
                            </Box>
                            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} marginRight={1} marginLeft={1}>
                              <Typography noWrap gutterBottom fontSize={'px'} component="div" alignItems={'center'} color={theme[10]}>
                              {item.name}
                              </Typography>
                              <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'row'}>
                                <Box marginTop={-1.25}>
                                  <IconButton onClick={() => removeOldItem(item)} >
                                    <RemoveIcon sx={{ fontSize: '20px', color: theme[10]}}></RemoveIcon>
                                  </IconButton>
                                </Box>
                                <Typography data-testid="quantity" noWrap gutterBottom fontSize={'16px'} component="div" alignItems={'center'} marginTop={-0.5} color={theme[10]}>
                                  {item.quantity}
                                </Typography>
                                <Box marginTop={-1.25}>
                                  <IconButton data-testid="increaseQuantity" onClick={() => addNewItem(item)}>
                                    <AddIcon sx={{ fontSize: '20px', color: theme[10]}}></AddIcon>
                                  </IconButton>
                                </Box>
                              </Box>
                            </Box>
                            <Typography noWrap gutterBottom fontSize={'20px'} marginTop={0.5} marginRight={2} marginLeft={1} color={theme[10]}>
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
                <Box width={'100%'} height={0} borderTop={1} sx={{ borderColor: theme[10]}}></Box>
                <Box component="form" noValidate autoComplete="off" display={'flex'} justifyContent={'center'} onSubmit={async (e) => await handleSubmit(e)}>
                <TextField
                      error={invalidCode}
                      id="coupon-code"
                      label="Coupon Code"
                      margin={'normal'}
                      sx={{width: '95%', borderColor: 'black', alignSelf: 'center'}}
                      helperText={helperMessage}
                      value={couponCode}
                      onChange={handleChange}
                    />
                </Box>
                <Box justifyContent={'space-between'} display={'flex'}>
                  <Typography noWrap gutterBottom variant="h5" component="span" marginLeft={2} color={theme[10]}>
                    Subtotal
                  </Typography>
                  <Typography data-testid="cartSubtotal" noWrap gutterBottom variant="h5" component="span" marginRight={2} color={theme[10]}>
                    ${parseFloat(`${appState.reduce((a:any, b:any) => (a) + (b.price * b.quantity), 0) }`).toFixed(2)}
                  </Typography>
                </Box>
                <Box justifyContent={'space-between'} display={'flex'}>
                  <Typography noWrap gutterBottom variant="h5" component="span" marginLeft={2} color={theme[10]}>
                    Discount
                  </Typography>
                  <Typography noWrap gutterBottom variant="h5" component="span" marginRight={2} color={'red'}>
                    -${parseFloat(`${discount}`).toFixed(2)}
                  </Typography>
                </Box>
                <Box justifyContent={'space-between'} display={'flex'}>
                  <Typography noWrap gutterBottom variant="h5" component="span" marginLeft={2} color={theme[10]}>
                    HST 13%
                  </Typography>
                  <Typography noWrap gutterBottom variant="h5" component="span" marginRight={2} color={theme[10]}>
                    ${parseFloat(`${Math.max(0,(appState.reduce((a:any, b:any) => (a) + (b.price * b.quantity), 0) - discount) * 0.13)}`).toFixed(2)}
                  </Typography>
                </Box>
                <Box justifyContent={'space-between'} display={'flex'}>
                  <Typography noWrap gutterBottom variant="h5" component="span" marginLeft={2} color={theme[10]}>
                    Total
                  </Typography>
                  <Typography data-testid="cartTotal" noWrap gutterBottom variant="h5" component="span" marginRight={2} color={theme[10]}>
                  ${parseFloat(`${Math.max(0,(appState.reduce((a:any, b:any) => (a) + (b.price * b.quantity), 0) - discount) * 1.13)}`).toFixed(2)}
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
