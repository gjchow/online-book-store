import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ItemCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Item Name
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Item Price
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "right"}}>
          <Button variant="contained">Add to Cart</Button>
      </CardActions>
    </Card>
  );
}
