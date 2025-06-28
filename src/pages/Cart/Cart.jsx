import React, { useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/Product/CurrencyFormat";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/action.type";
import styles from "./cart.module.css"; 

const Cart = () => {
  const [state, dispatch] = useContext(DataContext);
  const { basket, user } = state || { basket: [], user: null };

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const totalItemsInBasket = basket.reduce((count, item) => {
    return item.amount + count;
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
        <div className={styles.cartPageHeader}>
          <h1 className={styles.mainCartTitle}>Shopping Cart</h1>
          <span className={styles.priceColumnHeader}>Price</span>
        </div>
        <hr className={styles.headerDivider} />

        {basket?.length === 0 ? (
          <div className={styles.emptyCartSection}>
            <img
              src="/images/empty-cart.svg" 
              alt="Empty cart"
              className={styles.emptyCartImage}
            />
            <h2>Your Amazon Cart is empty</h2>
            <Link to="/" className={styles.shopTodayLink}>
              Shop today's deals
            </Link>
          </div>
        ) : (
          <div className={styles.cartLayout}>
            <div className={styles.cartItemsSection}>
              {basket?.map((item) => (
                <section className={styles.productItem} key={item.id}>
                  <div className={styles.productDetailsArea}>
                    {/* THIS IS THE ADDED WRAPPER for ProductCard scoping */}
                    <div className={styles.cartItemProductCardWrapper}>
                      <ProductCard
                        product={item}
                        renderDesc={true}
                        renderAdd={false}
                        flex={true} 
                      />
                    </div>
                    <div className={styles.itemActions}>
                      <div className={styles.quantityControls}>
                        <button
                          onClick={() =>
                            item.amount <= 1
                              ? dispatch({
                                  type: Type.REMOVE_FROM_BASKET,
                                  id: item.id,
                                })
                              : decrement(item.id)
                          }
                          className={`${styles.quantityButton} ${styles.decrementButton}`}
                          aria-label="Decrement quantity"
                        >
                          {item.amount <= 1 ? (
                            <span className={styles.deleteIcon}>🗑️</span>
                          ) : (
                            "-"
                          )}
                        </button>
                        <span className={styles.quantityAmount}>
                          {item.amount}
                        </span>
                        <button
                          onClick={() => increment(item)}
                          className={`${styles.quantityButton} ${styles.incrementButton}`}
                          aria-label="Increment quantity"
                        >
                          +
                        </button>
                      </div>
                      <span
                        className={styles.actionLink}
                        onClick={() =>
                          dispatch({
                            type: Type.REMOVE_FROM_BASKET,
                            id: item.id,
                          })
                        }
                      >
                        Delete
                      </span>
                      <span className={styles.actionLink}>Save for later</span>
                    </div>
                  </div>
                  <div className={styles.itemPrice}>
                    <CurrencyFormat amount={item.price} />
                  </div>
                </section>
              ))}
              <div className={styles.cartListSubtotal}>
                Subtotal ({totalItemsInBasket}{" "}
                {totalItemsInBasket === 1 ? "item" : "items"}):{" "}
                <span className={styles.subtotalAmount}>
                  <CurrencyFormat amount={total} />
                </span>
              </div>
            </div>

            <div className={styles.checkoutPanel}>
              <div className={styles.checkoutSubtotal}>
                Subtotal ({totalItemsInBasket}{" "}
                {totalItemsInBasket === 1 ? "item" : "items"}):{" "}
                <span className={styles.subtotalAmountBold}>
                  <CurrencyFormat amount={total} />
                </span>
              </div>
              <div className={styles.giftOption}>
                <input
                  type="checkbox"
                  id="giftCheckbox"
                  className={styles.giftCheckbox}
                />
                <label htmlFor="giftCheckbox" className={styles.giftLabel}>
                  This order contains a gift
                </label>
              </div>
              <Link to="/payments" className={styles.proceedToCheckoutButton}>
                Proceed to checkout
              </Link>
            </div>
          </div>
        )}
        <div className={styles.yourItemsSection}>
          <h2 className={styles.yourItemsTitle}>Your Items</h2>
          <div className={styles.yourItemsTabs}>
            <button className={`${styles.yourItemsTab} ${styles.activeTab}`}>
              No items saved for later
            </button>
            <button className={styles.yourItemsTab}>Buy it again</button>
          </div>
          <div className={styles.yourItemsContent}>No items</div>
        </div>
      </div>
    </LayOut>
  );
};

export default Cart;
