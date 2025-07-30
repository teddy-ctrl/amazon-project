import React from 'react';
import { Link } from 'react-router-dom';
import styles from './DealItem.module.css';

const DealItem = ({ item }) => {
    return (
        <Link to={`/products/${item.id}`} className={styles.dealItem}>
            <div className={styles.imageContainer}>
                <img src={item.image} alt={item.title} />
            </div>
            <div className={styles.details}>
                <div className={styles.discountBadge}>
                    Up to {item.discount}% off
                </div>
                <div className={styles.dealText}>Deal of the Day</div>
                <p className={styles.description}>{item.title}</p>
            </div>
        </Link>
    );
};

export default DealItem;