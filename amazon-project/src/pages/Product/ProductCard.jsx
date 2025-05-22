// // import React from "react";
// // import Rating from '@mui/material/Rating';
// // import CurrencyFormat from "./CurrencyFormat";
// // import styles from "./product.module.css";
// // import { Link } from "react-router-dom";

// // const ProductCard = ({ product, flex }) => {
// //     const { image, title, id, rating, price } = product;

// //     return (
// //         <div className={styles.card}>
// //             <Link to={`/products/${id}`} className={styles.imageContainer}>
// //                 <img src={image} alt={title} className={styles.productImage} />
// //             </Link>
// //             <div className={styles.content}>
// //                 <h3 className={styles.title}>{title}</h3>
// //                 <div className={styles.ratingContainer}>
// //                     <Rating value={rating.rate} precision={0.1} readOnly size="small" />
// //                     <small className={styles.ratingCount}>({rating.count})</small>
// //                 </div>
// //                 <div className={styles.price}>
// //                     <CurrencyFormat amount={price} />
// //                 </div>
// //                 <button className={styles.addToCart}>Add to Cart</button>
// //             </div>
// //         </div>
// //     );
// // };

// // export default ProductCard;




// import React, { useContext } from "react";
// import Rating from "@mui/material/Rating";
// import CurrencyFormat from "./CurrencyFormat";
// import styles from "./product.module.css";
// import { Link } from "react-router-dom";
// import { DataContext } from "../../Components/DataProvider/DataProvider";

// const ProductCard = ({ product, flex, renderDesc}) => {
//   if (!product) return null; // Prevent destructuring if product is null

//   const { image, title, id, rating, price, description } = product;

//   const [state, dispatch] = useContext(DataContext)
//     // console.log(state)

//   const addToCart = () => {
//     dispatch({
//       type:Type.Add_TO_BASKET,
//       item:{
//         image, title, id, rating, price, description
//       }
//     })
//   }

//   return (
//     <div className={`${styles.card} ${flex ? styles.productFlexed : ''}`} >
//       <Link to={`/products/${id}`} className={styles.imageContainer}>
//         <img
//           src={image || "/placeholder-image.jpg"}
//           alt={title || "Product image"}
//           className={styles.productImage}
//         />
//       </Link>
//       <div className={styles.content}>
//         <h3 className={styles.title}>{title || "Untitled Product"}</h3>
//         {renderDesc && <div>{description}</div>}
//         <div className={styles.ratingContainer}>
//           <Rating
//             value={rating?.rate || 0}
//             precision={0.1}
//             readOnly
//             size="small"
//           />
//           <small className={styles.ratingCount}>({rating?.count || 0})</small>
//         </div>
//         <div className={styles.price}>
//           <CurrencyFormat amount={price || 0} />
//         </div>
//         <button type="button" className={styles.addToCart} onClick={addToCart}>
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;




import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "./CurrencyFormat";
import styles from "./product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../../Components/DataProvider/DataProvider";

// ProductCard component displays a single product with image, title, rating, price, and add-to-cart button
// Props: product (object with product data), flex (boolean for flexible layout), renderDesc (boolean to show description)
const ProductCard = ({ product, flex, renderDesc }) => {
  // Early return if product is null to prevent destructuring errors (fixes TypeError from previous version)
  if (!product) return null;

  // Destructure product properties with safe defaults
  const { image, title, id, rating, price, description } = product;

  // Access DataContext to manage cart state (used in NavBar for basket length)
  // state contains basket; dispatch is used to add items to cart
  const [state, dispatch] = useContext(DataContext);
  // Removed console.log(state) to clean up code

  // Function to add product to cart via DataContext dispatch
  // Dispatches ADD_TO_BASKET action with product details
  const addToCart = () => {
    dispatch({
      type: "ADD_TO_BASKET", // Action type for adding item to cart (ensure Type.Add_TO_BASKET is defined in DataProvider)
      item: {image, title, id, rating, price, description,},
    });
  };

  return (
    // Card container with dynamic class for flexible layout (flex prop adds productFlexed class)
    <div className={`${styles.card} ${flex ? styles.productFlexed : ""}`}>
      {/* Link to product detail page, wraps image */}
      <Link to={`/products/${id}`} className={styles.imageContainer}>
        <img
          // Fallback image if product.image is missing (fixes null image error)
          src={image || "/placeholder-image.jpg"}
          // Fallback alt text for accessibility
          alt={title || "Product image"}
          className={styles.productImage}
        />
      </Link>
      {/* Content section with title, description, rating, price, and button */}
      <div className={styles.content}>
        {/* Product title with fallback for missing title */}
        <h3 className={styles.title}>{title || "Untitled Product"}</h3>
        {/* Conditionally render description if renderDesc is true */}
        {renderDesc && <div>{description}</div>}
        {/* Rating section with star rating and review count */}
        <div className={styles.ratingContainer}>
          <Rating
            // Safe access to rating.rate with fallback to 0 (fixes undefined rating error)
            value={rating?.rate || 0}
            precision={0.1}
            readOnly
            size="small"
          />
          {/* Review count with fallback */}
          <small className={styles.ratingCount}>({rating?.count || 0})</small>
        </div>
        {/* Price display using CurrencyFormat component */}
        <div className={styles.price}>
          <CurrencyFormat amount={price || 0} /> {/* Fallback to 0 for price */}
        </div>
        {/* Add to Cart button with explicit type and onClick handler */}
        <button
          type="button" // Added to prevent form submission issues (fixes accessibility error)
          className={styles.addToCart}
          onClick={addToCart} // Triggers addToCart function to update basket
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;