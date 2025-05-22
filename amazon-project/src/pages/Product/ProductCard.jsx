// import React from "react";
// import Rating from '@mui/material/Rating';
// import CurrencyFormat from "./CurrencyFormat";
// import styles from "./product.module.css";
// import { Link } from "react-router-dom";

// const ProductCard = ({ product, flex }) => {
//     const { image, title, id, rating, price } = product;

//     return (
//         <div className={styles.card}>
//             <Link to={`/products/${id}`} className={styles.imageContainer}>
//                 <img src={image} alt={title} className={styles.productImage} />
//             </Link>
//             <div className={styles.content}>
//                 <h3 className={styles.title}>{title}</h3>
//                 <div className={styles.ratingContainer}>
//                     <Rating value={rating.rate} precision={0.1} readOnly size="small" />
//                     <small className={styles.ratingCount}>({rating.count})</small>
//                 </div>
//                 <div className={styles.price}>
//                     <CurrencyFormat amount={price} />
//                 </div>
//                 <button className={styles.addToCart}>Add to Cart</button>
//             </div>
//         </div>
//     );
// };

// export default ProductCard;




import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "./CurrencyFormat";
import styles from "./product.module.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product, flex, renderDesc}) => {
  if (!product) return null; // Prevent destructuring if product is null

  const { image, title, id, rating, price, description } = product;

  return (
    <div className={`${styles.card} ${flex ? styles.productFlexed : ''}`} >
      <Link to={`/products/${id}`} className={styles.imageContainer}>
        <img
          src={image || "/placeholder-image.jpg"}
          alt={title || "Product image"}
          className={styles.productImage}
        />
      </Link>
      <div className={styles.content}>
        <h3 className={styles.title}>{title || "Untitled Product"}</h3>
        {renderDesc && <div>{description}</div>}
        <div className={styles.ratingContainer}>
          <Rating
            value={rating?.rate || 0}
            precision={0.1}
            readOnly
            size="small"
          />
          <small className={styles.ratingCount}>({rating?.count || 0})</small>
        </div>
        <div className={styles.price}>
          <CurrencyFormat amount={price || 0} />
        </div>
        <button type="button" className={styles.addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

