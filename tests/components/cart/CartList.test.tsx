import { useRouter } from 'next/router';
import { render, screen, fireEvent, act } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import AccountPopover from 'fleed/components/admin/ui/adminHeader/AccountPopover';
import { CartList } from 'fleed/components/cart/CartList';
import CartProviderComponent from 'fleed/components/cart/CartProvider';
import { CartProvider } from 'use-shopping-cart';

jest.mock('next/router', () => jest.requireActual('next-router-mock'))



describe('Cart List tests', () => {
  test('Render Cart List', () => {
        const handleCheckout = jest.fn()

        act(() => {
          render(
            // <CartProviderComponent>
            <CartProvider  
            cartMode="checkout-session"
            stripe={'as123asdfasd' as string}
            currency={'COP'}
            shouldPersist
            
           
          >
            <CartList handleCheckout={handleCheckout}/>
          </CartProvider>
            // </CartProviderComponent>
           )
        });
       
  });
});