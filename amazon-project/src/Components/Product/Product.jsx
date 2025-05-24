import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from 'axios';
import styles from './Product.module.css';

const Product = () => {
    const [products, setProducts] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then((res) => {
                setProducts(res.data);
                // setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setError("Failed to load products. Please try again later.");
                // setLoading(false);
            });
    }, []);

    // if (loading) {
    //     return <p className={styles.loading}>Loading products...</p>;
    // }

    if (error) {
        return <p className={styles.error}>{error}</p>;
    }

    return (
        <section className={styles.productSection}>
            {products.map((singleProduct) => (
                <ProductCard renderAdd={true} product={singleProduct} key={singleProduct.id} />
            ))}
        </section>
    );
};

export default Product;