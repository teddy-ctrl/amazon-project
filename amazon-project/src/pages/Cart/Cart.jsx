// import React, { useContext } from 'react'
// import LayOut from '../../Components/LayOut/LayOut'
// import { DataContext } from '../../Components/DataProvider/DataProvider'
// import {ProductCart} from '../Product/ProductCard'

// const Cart = () => {
//   const [{basket, user}, dispatch] = useContext(DataContext)
//   return (
//     <>
//         <LayOut>
//             <div>
//               <div>
//                   <h2>Hello</h2>
//                   <h3>Your shopping basket</h3>
//                   <hr />
//                   {
//                     basket?.length == 0 ? (<p>Opps ! No item in your cartIcon</p>) : (
//                       basket?.map((item, index) => {
//                       return <ProductCart key={index} 
//                        product={item}
//                       renderDecs={true}
//                       flex={true}
//                        />
                     
//                     })
//                   )
//                   }
//               </div>
//             </div>
//         </LayOut>
//     </>
//   )
// }

// export default Cart






// import React, { useContext } from 'react';
// import LayOut from '../../Components/LayOut/LayOut';
// import { DataContext } from '../../Components/DataProvider/DataProvider';
// import ProductCard from '../../Components/Product/ProductCard'; // Fixed import and removed curly braces
// import CurrencyFormat from '../../Components/Product/CurrencyFormat';
// import { Link } from 'react-router-dom';
// import {Type} from '../../Utility/action.type'

// const Cart = () => {
//   // Fixed destructuring to match DataContext structure from reducer.js
//   const [state, dispatch] = useContext(DataContext);
//   const { basket } = state || { basket: [] }; // Fallback to empty array if state is undefined
//   const total = basket.reduce((amount, item) => {
//     return item.price * item.amount + amount
//   }, 0)


//   const increment = (item) => {
//     dispatch({
//       type:Type.ADD_TO_BASKET,
//       item
//     })
//   }

//   const decrement = (id) => {
//     dispatch({
//       type:Type.REMOVE_FROM_BASKET,
//       id
//     })
//   }

//   return (
//     <LayOut>
//       <div>
//         <div>
//           <h2>Hello</h2>
//           <h3>Your shopping basket</h3>
//           <hr />
//           {basket?.length === 0 ? (
//             <p>Oops! No items in your cart</p> // Fixed typo and message
//           ) : (
//             basket?.map((item) => (

//               <section>
//               <ProductCard
//                 key={item.id} // Used item.id for stable key
//                 product={item}
//                 renderDesc={true} // Fixed typo from renderDecs
//                 renderAdd={false}
//                 flex={true}
//               />
//               <div>
//                 <button onClick={() => increment(item)}>+</button>
//                 <span>{item.amount}</span>
//                 <button onClick={() => decrement(item.id)}>-</button>
//               </div>
//               </section>

//             ))
//           )}
//         </div>

//         {basket?.length !==0&&(
//           <div>
//             <div>
//               <p>Subtotal ({basket?.length} items)</p>
//               <CurrencyFormat amount={total}/>
//             </div>
//             <span>
//               <input type="checkbox" />
//               <small>This order contains a gift</small>
//             </span>
//             <Link to='/payments'>Continue to checkourt</Link>
//           </div>
//         )}
//       </div>
//     </LayOut>
//   );
// };

// export default Cart;


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

export default Cart;