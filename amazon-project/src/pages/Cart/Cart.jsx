import React, { useContext } from 'react';
import LayOut from '../../Components/LayOut/LayOut';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import CurrencyFormat from '../../Components/Product/CurrencyFormat';
import { Link } from 'react-router-dom';
import { Type } from '../../Utility/action.type';
import styles from './cart.module.css';

const Cart = () => {
  const [state, dispatch] = useContext(DataContext);
  const { basket } = state || { basket: [] };
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <LayOut>
      <div className={styles.cartContainer}>
        <h2 className={styles.greeting}>Hello</h2>
        <h3 className={styles.cartTitle}>Your shopping basket</h3>
        <hr className={styles.divider} />
        {basket?.length === 0 ? (
          <p className={styles.emptyCart}>Oops! No items in your cart</p>
        ) : (
          <div className={styles.cartLayout}>
            <div className={styles.cartSection}>
              {basket?.map((item) => (
                <section className={styles.productItem} key={item.id}>
                  <ProductCard
                    product={item}
                    renderDesc={true}
                    renderAdd={false}
                    flex={true}
                  />
                  <div className={styles.quantityControls}>
                    <button onClick={() => increment(item)} className={styles.quantityButton}>+</button>
                    <span className={styles.quantityAmount}>{item.amount}</span>
                    <button onClick={() => decrement(item.id)} className={styles.quantityButton}>-</button>
                  </div>
                </section>
              ))}
            </div>

            <div className={styles.checkoutSection}>
              <div className={styles.subtotal}>
                <p>Subtotal ({basket?.length} items)</p>
                <CurrencyFormat amount={total} />
              </div>
              <span className={styles.giftOption}>
                <input type="checkbox" className={styles.giftCheckbox} />
                <small className={styles.giftLabel}>This order contains a gift</small>
              </span>
              <Link to="/payments" className={styles.checkoutButton}>Continue to checkout</Link>
            </div>
          </div>
        )}
      </div>
    </LayOut>
  );
};

export default Cart