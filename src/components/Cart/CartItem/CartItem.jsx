import React from 'react';
import { Typography, Card, Button, CardContent, CardMedia, CardActions } from '@material-ui/core';
import useStyles from './styles';


const CartItem = ({ item, onRemoveFromCart, onUpdateCartQty }) => {
    const classes = useStyles();

    const handleUpdateCartQty = (lineItemId, newQuantity) => onUpdateCartQty(lineItemId, newQuantity);

    const handleRemoveFromCart = (lineItemId) => onRemoveFromCart(lineItemId);
    return (
        <Card className="cart-item">
            <CardMedia image={item.media.source} alt={item.name} className={classes.media} />
            <CardContent className={classes.cartContent} >
                <Typography variant='h4' >{item.name}</Typography>
                <Typography variant='h6' >{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.CardActions}>
                <div className={classes.buttons}>
                    <Button type='button' size='small' onClick={() => handleUpdateCartQty(item.id, item.quantity-1)} >-</Button>
                    <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
                    <Button type='button' size='small' onClick={() => handleUpdateCartQty(item.id, item.quantity+1)}>+</Button>
                </div>
                <Button variant='contained' type='button' color='secondary' onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
            </CardActions>
        </Card>
    );
};

export default CartItem;