import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "./CurrencyFormat";
import styles from "./product.module.css"; // Use your new CSS module
import { Link } from "react-router-dom";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

const ProductCard = ({ product, flex, renderDesc, renderAdd, isCheckoutItem }) => {
    // This component now correctly handles a null product prop
    if (!product) return null;

    // Destructure all possible properties from your product object
    const { image, title, id, rating, reviews, price, description, amount } = product;

    // Use a safer method to get dispatch
    const context = useContext(DataContext);
    const dispatch = context ? context[1] : null;

    const addToCart = (e) => {
        // Prevent the parent Link from navigating when the button itself is clicked
        e.preventDefault(); 
        if (dispatch) {
            dispatch({
                type: Type.ADD_TO_BASKET,
                item: { ...product, amount: 1 }, // Pass the whole product
            });
        }
    };

    return (
        <div className={`${styles.card} ${flex ? styles.productFlexed : ""}`}>
            <Link to={`/products/${id}`} className={styles.imageContainer}>
                <img
                    src={image || "https://source.unsplash.com/random/640x480/?product"}
                    alt={title || "Product image"}
                />
            </Link>

            {/* This is the key flex container for vertical alignment */}
            <div className={styles.content}>
                
                {/* A new wrapper for all the top-aligned content */}
                <div className={styles.infoSection}>
                    <Link to={`/products/${id}`}>
                        <h3 className={styles.title}>{title || "Untitled Product"}</h3>
                    </Link>

                    {renderDesc && <div>{description}</div>}

                    <div className={styles.ratingContainer}>
                        {/* Use the correct properties: 'rating' and 'reviews' */}
                        <Rating
                            value={rating || 0}
                            precision={0.1}
                            readOnly
                            size="small"
                        />
                        <small className={styles.ratingCount}>({(reviews || 0).toLocaleString()})</small>
                    </div>

                    <div className={styles.price}>
                        <CurrencyFormat amount={price || 0} />
                        {isCheckoutItem && amount > 1 && (
                            <small> (Qty: {amount})</small>
                        )}
                    </div>
                </div>

                {/* This button is now the second child of the flex container, pushed to the bottom */}
                {!isCheckoutItem && renderAdd && (
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