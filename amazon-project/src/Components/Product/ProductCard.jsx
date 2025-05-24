import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "./CurrencyFormat";
import styles from "./product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type"; 

const ProductCard = ({ product, flex, renderDesc, renderAdd }) => {
  if (!product) return null;

  const { image, title, id, rating, price, description } = product;

  const [state, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET, 
      item: { image, title, id, rating, price, description },
    });
  };

  return (
    <div className={`${styles.card} ${flex ? styles.productFlexed : ""}`}>
      <Link to={`/products/${id}`} className={styles.imageContainer}>
        <img
          src={image || "https://source.unsplash.com/random/640x480/?product"} 
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
        {renderAdd && (
          <button
            type="button"
            className={styles.addToCart}
            onClick={addToCart}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;