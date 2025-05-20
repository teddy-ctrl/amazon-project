import React from "react";
import Rating from '@mui/material/Rating';
import CurrencyFormat from "./CurrencyFormat";
import styles from "./product.module.css";

const ProductCard = ({ product }) => {
    const { image, title, id, rating, price } = product;

    return (
        <div className={styles.card}>
            <a href={`/product/${id}`} className={styles.imageContainer}>
                <img src={image} alt={title} className={styles.productImage} />
            </a>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.ratingContainer}>
                    <Rating value={rating.rate} precision={0.1} readOnly size="small" />
                    <small className={styles.ratingCount}>({rating.count})</small>
                </div>
                <div className={styles.price}>
                    <CurrencyFormat amount={price} />
                </div>
                <button className={styles.addToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductCard;