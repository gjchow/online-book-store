import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { addToCart } from './lib/cartData';
import { connect } from 'react-redux';

//Taken from https://mui.com/material-ui/react-card/#main-content
// @ts-ignore
function ItemCard({ addNewItem, item }) {
  const handleClick = () => {
    addNewItem(item);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 1 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://via.placeholder.com/150x75"
        alt="green iguana"
      />
      <CardContent>
        <Tooltip title={item.title} arrow enterDelay={500}>
          <Typography noWrap gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
        </Tooltip>
        <Typography variant="body2" color="text.secondary">
          ${item.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "right"}}>
          <Button variant="contained" onClick={handleClick}>Add to Cart</Button>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = (state: any) => ({
  appState: state,
});

const mapDispatchToProps = (dispatch: any) => ({
  addNewItem: (item: any) => dispatch(addToCart(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemCard);