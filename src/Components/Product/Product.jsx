import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard"; 
import axios from 'axios';
import styles from './product.module.css'; 

const Product = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true); 
        axios.get('https://fakestoreapi.com/products')
            .then((res) => {
                setProducts(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setError("Failed to load products. Please try again later.");
                setIsLoading(false);
            });
    }, []);

    if (isLoading) { 
        return <p className={styles.loading}>Loading products...</p>;
    }

    if (error) {
        return <p className={styles.error}>{error}</p>;
    }

    if (products.length === 0 && !isLoading) { 
        return <p className={styles.loading}>No products found.</p>;
    }

    return (
        <section className={styles.productSection}>
            {products.map((singleProduct) => (
                <ProductCard
                    renderAdd={true}
                    product={singleProduct}
                    key={singleProduct.id}
                   
                />
            ))}
        </section>
    );
};

export default Product;