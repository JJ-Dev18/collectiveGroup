import { NextPage } from 'next';

import CheckoutForm from '../components/CheckoutForm';
import LayoutDonate from 'fleed/components/layouts/LayoutDonate';

const DonatePage: NextPage = () => {
  return (
    <LayoutDonate title="Donate with Checkout | Next.js + TypeScript Example">
      <div className="page-container">
        <h1>Donate with Checkout</h1>
        <p>Donate to our project 💖</p>
        <CheckoutForm />
      </div>
    </LayoutDonate>
  );
};

export default DonatePage;