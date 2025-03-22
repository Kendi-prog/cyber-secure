import { FC, memo } from 'react';
import { CartItem as TCartItem } from '../../store/cart/cart.types';

import { CartItemContainer, Image, ItemDetails, Name, Price } from './cart-item.styles';

type CartItemProps = {
    cartItem: TCartItem;
}


const CartItem : FC<CartItemProps> = memo(({ cartItem } ) => {
    const { name, imageUrl, price, quantity } = cartItem;
    return(
        <CartItemContainer>
            <Image src={imageUrl} alt={`${name}`} />
            <ItemDetails>
                <Name>{name}</Name>
                <Price>{quantity} x ${price}</Price>
            </ItemDetails>
            
        </CartItemContainer>
    );
});

export default CartItem;