import './cart-dropdown';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { selectCartItems } from '../../store/cart/cart.selector';
import { useNavigate } from 'react-router-dom';
import { CartDropdownContainer, EmptyMessage, CartItemsContainer } from './cart-dropdown';

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckoutHandler = useCallback(() => {
        navigate('/checkout');
    }, [])

    return(
        <CartDropdownContainer>
            <CartItemsContainer>
            {
                cartItems.length ? ( cartItems.map(item => 
                <CartItem key={item.id} cartItem={item}/>
                )) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )
               
            }
            </CartItemsContainer>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>

    );
}

export default CartDropdown;